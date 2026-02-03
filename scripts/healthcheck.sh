#!/bin/bash
#
# BioBridge - Health Check Script
# Quick diagnostic of system status
#
# Usage: ./scripts/healthcheck.sh
#

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

OK="${GREEN}[OK]${NC}"
FAIL="${RED}[FAIL]${NC}"
WARN="${YELLOW}[WARN]${NC}"

echo "=========================================="
echo "  BioBridge Health Check"
echo "=========================================="
echo ""

# Docker check
echo -n "Docker daemon: "
if docker info &> /dev/null; then
    echo -e "$OK"
else
    echo -e "$FAIL - Docker not running"
    exit 1
fi

# Container status
echo ""
echo "Container Status:"
echo "-----------------"

check_container() {
    local name=$1
    local container="biobridge-$name"
    
    if docker ps --format '{{.Names}}' | grep -q "^${container}$"; then
        local status=$(docker inspect --format='{{.State.Health.Status}}' "$container" 2>/dev/null || echo "no-healthcheck")
        case $status in
            healthy)
                echo -e "  $name: $OK (healthy)"
                ;;
            unhealthy)
                echo -e "  $name: $FAIL (unhealthy)"
                ;;
            starting)
                echo -e "  $name: $WARN (starting)"
                ;;
            *)
                echo -e "  $name: $OK (running)"
                ;;
        esac
        return 0
    else
        echo -e "  $name: $FAIL (not running)"
        return 1
    fi
}

check_container "db"
check_container "backend"
check_container "frontend"

# API Health
echo ""
echo "API Health:"
echo "-----------"

echo -n "  Backend /health: "
HEALTH=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8000/health 2>/dev/null || echo "000")
if [[ "$HEALTH" == "200" ]]; then
    echo -e "$OK"
    HEALTH_RESPONSE=$(curl -s http://localhost:8000/health)
    echo "    Mode: $(echo $HEALTH_RESPONSE | jq -r '.mode' 2>/dev/null || echo 'unknown')"
else
    echo -e "$FAIL (HTTP $HEALTH)"
fi

echo -n "  Frontend: "
FRONTEND=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:5173 2>/dev/null || echo "000")
if [[ "$FRONTEND" == "200" ]]; then
    echo -e "$OK"
else
    echo -e "$FAIL (HTTP $FRONTEND)"
fi

# Database
echo ""
echo "Database:"
echo "---------"

echo -n "  PostgreSQL connection: "
if docker exec biobridge-db pg_isready -U biobridge &> /dev/null; then
    echo -e "$OK"
    
    # Get measurement count
    COUNT=$(docker exec biobridge-db psql -U biobridge -d biobridge -t -c "SELECT COUNT(*) FROM measurements;" 2>/dev/null | tr -d ' ')
    if [[ -n "$COUNT" ]]; then
        echo "    Measurements: $COUNT"
    fi
else
    echo -e "$FAIL"
fi

# Resource usage
echo ""
echo "Resource Usage:"
echo "---------------"

# Docker stats
docker stats --no-stream --format "  {{.Name}}: CPU {{.CPUPerc}}, Mem {{.MemUsage}}" \
    biobridge-db biobridge-backend biobridge-frontend 2>/dev/null || echo "  Unable to get stats"

# Disk usage
echo ""
echo -n "  Disk (Docker): "
DISK=$(docker system df --format "{{.Size}}" 2>/dev/null | head -1)
echo "$DISK"

echo ""
echo "=========================================="

# Final verdict
ALL_OK=true
for container in db backend frontend; do
    if ! docker ps --format '{{.Names}}' | grep -q "^biobridge-${container}$"; then
        ALL_OK=false
    fi
done

if [[ "$HEALTH" != "200" ]]; then
    ALL_OK=false
fi

echo ""
if [[ "$ALL_OK" == "true" ]]; then
    echo -e "${GREEN}All systems operational${NC}"
    exit 0
else
    echo -e "${YELLOW}Some issues detected - check above${NC}"
    exit 1
fi
