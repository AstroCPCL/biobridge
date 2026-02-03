#!/bin/bash
#
# BioBridge - Deployment Script for Raspberry Pi
# Run this to pull latest changes and redeploy
#
# Usage: ./scripts/deploy_pi.sh [options]
#
# Options:
#   --no-build    Skip docker build (use existing images)
#   --logs        Follow logs after deployment
#   --clean       Remove old images and volumes before deploy
#

set -e

# Configuration
PROJECT_DIR="${PROJECT_DIR:-$HOME/projects/biobridge}"
COMPOSE_DIR="$PROJECT_DIR/infra/compose"
ENV_FILE="$PROJECT_DIR/.env"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Parse arguments
NO_BUILD=false
FOLLOW_LOGS=false
CLEAN=false

while [[ $# -gt 0 ]]; do
    case $1 in
        --no-build)
            NO_BUILD=true
            shift
            ;;
        --logs)
            FOLLOW_LOGS=true
            shift
            ;;
        --clean)
            CLEAN=true
            shift
            ;;
        *)
            echo "Unknown option: $1"
            exit 1
            ;;
    esac
done

print_step() {
    echo -e "\n${BLUE}==>${NC} ${GREEN}$1${NC}"
}

print_warning() {
    echo -e "${YELLOW}[!]${NC} $1"
}

print_error() {
    echo -e "${RED}[✗]${NC} $1"
}

# Check prerequisites
check_prerequisites() {
    print_step "Checking prerequisites..."
    
    if ! command -v docker &> /dev/null; then
        print_error "Docker not installed. Run bootstrap_pi.sh first."
        exit 1
    fi
    
    if ! docker compose version &> /dev/null 2>&1; then
        print_error "Docker Compose not installed. Run bootstrap_pi.sh first."
        exit 1
    fi
    
    if [[ ! -d "$PROJECT_DIR" ]]; then
        print_error "Project directory not found: $PROJECT_DIR"
        echo "Clone the repository first:"
        echo "  git clone <REPO_URL> $PROJECT_DIR"
        exit 1
    fi
    
    if [[ ! -f "$ENV_FILE" ]]; then
        print_warning ".env file not found, copying from example..."
        cp "$PROJECT_DIR/.env.example" "$ENV_FILE"
        echo "Please edit $ENV_FILE with your configuration"
    fi
}

# Pull latest changes
pull_changes() {
    print_step "Pulling latest changes..."
    cd "$PROJECT_DIR"
    
    # Check for local changes
    if [[ -n $(git status --porcelain) ]]; then
        print_warning "Local changes detected. Stashing..."
        git stash
    fi
    
    git pull origin main || git pull origin master || {
        print_error "Failed to pull changes"
        exit 1
    }
    
    echo "Current commit: $(git log -1 --oneline)"
}

# Clean old resources
clean_resources() {
    if [[ "$CLEAN" == "true" ]]; then
        print_step "Cleaning old resources..."
        cd "$COMPOSE_DIR"
        
        # Stop containers
        docker compose --env-file "$ENV_FILE" down --remove-orphans || true
        
        # Remove old images
        docker image prune -f
        
        # Optionally remove volumes (dangerous!)
        # docker volume prune -f
    fi
}

# Build and deploy
deploy() {
    print_step "Deploying BioBridge..."
    cd "$COMPOSE_DIR"
    
    if [[ "$NO_BUILD" == "true" ]]; then
        echo "Skipping build, using existing images..."
        docker compose --env-file "$ENV_FILE" up -d
    else
        echo "Building and starting containers..."
        docker compose --env-file "$ENV_FILE" up -d --build
    fi
}

# Health check
health_check() {
    print_step "Running health checks..."
    
    # Wait for services to start
    echo "Waiting for services to start..."
    sleep 10
    
    # Check container status
    echo ""
    echo "Container status:"
    cd "$COMPOSE_DIR"
    docker compose ps
    
    # Check backend health
    echo ""
    echo "Backend health:"
    curl -s http://localhost:8000/health | jq . || {
        print_warning "Backend health check failed (may still be starting)"
    }
    
    # Check database
    echo ""
    echo "Database status:"
    docker compose exec -T db pg_isready -U biobridge && echo "PostgreSQL: Ready" || {
        print_warning "Database not ready"
    }
}

# Show logs
show_logs() {
    if [[ "$FOLLOW_LOGS" == "true" ]]; then
        print_step "Following logs (Ctrl+C to exit)..."
        cd "$COMPOSE_DIR"
        docker compose logs -f
    fi
}

# Print summary
print_summary() {
    echo ""
    echo -e "${GREEN}=========================================="
    echo "  Deployment Complete!"
    echo "==========================================${NC}"
    echo ""
    echo "Services:"
    echo "  - Backend API:  http://localhost:8000"
    echo "  - Frontend:     http://localhost:5173"
    echo "  - API Docs:     http://localhost:8000/docs"
    echo ""
    echo "Useful commands:"
    echo "  View logs:      cd $COMPOSE_DIR && docker compose logs -f"
    echo "  Stop:           cd $COMPOSE_DIR && docker compose down"
    echo "  Restart:        cd $COMPOSE_DIR && docker compose restart"
    echo "  Shell:          cd $COMPOSE_DIR && docker compose exec backend bash"
    echo ""
}

# Main
main() {
    echo "=========================================="
    echo "  BioBridge Deployment"
    echo "=========================================="
    
    check_prerequisites
    pull_changes
    clean_resources
    deploy
    health_check
    print_summary
    show_logs
}

main "$@"
