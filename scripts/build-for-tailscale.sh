#!/bin/bash
# Build script for Tailscale Funnel deployment
# This builds the frontend with relative API URLs and copies to backend/static

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "==================================="
echo "BioBridge - Tailscale Build"
echo "==================================="

# Step 1: Build frontend with empty VITE_API_URL (relative paths)
echo ""
echo "[1/3] Building frontend with relative API URLs..."
cd "$PROJECT_ROOT/frontend"

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm ci
fi

# Build with empty API URL for relative paths
VITE_API_URL="" npm run build

# Step 2: Copy frontend build to backend/static
echo ""
echo "[2/3] Copying frontend build to backend/static..."
rm -rf "$PROJECT_ROOT/backend/static"
cp -r "$PROJECT_ROOT/frontend/dist" "$PROJECT_ROOT/backend/static"

# Step 3: Build Docker images
echo ""
echo "[3/3] Building Docker images..."
cd "$PROJECT_ROOT/infra/compose"
docker compose -f docker-compose.tailscale.yml build --no-cache

echo ""
echo "==================================="
echo "Build complete!"
echo ""
echo "To deploy:"
echo "  cd $PROJECT_ROOT/infra/compose"
echo "  docker compose -f docker-compose.tailscale.yml up -d"
echo ""
echo "Then configure Tailscale Funnel:"
echo "  tailscale funnel 8000"
echo "==================================="
