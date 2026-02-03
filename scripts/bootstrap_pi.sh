#!/bin/bash
#
# BioBridge - Raspberry Pi Bootstrap Script
# Run this once on a fresh Raspberry Pi to install all prerequisites
#
# Usage: curl -fsSL https://raw.githubusercontent.com/<user>/biobridge/main/scripts/bootstrap_pi.sh | bash
# Or: ./scripts/bootstrap_pi.sh
#

set -e

echo "=========================================="
echo "  BioBridge - Raspberry Pi Bootstrap"
echo "=========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${GREEN}[✓]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[!]${NC} $1"
}

print_error() {
    echo -e "${RED}[✗]${NC} $1"
}

# Check if running on Raspberry Pi
check_platform() {
    if [[ ! -f /proc/device-tree/model ]]; then
        print_warning "Not running on Raspberry Pi (or model file not found)"
        print_warning "Continuing anyway..."
    else
        MODEL=$(cat /proc/device-tree/model)
        echo "Detected: $MODEL"
    fi
}

# Update system
update_system() {
    print_status "Updating system packages..."
    sudo apt-get update
    sudo apt-get upgrade -y
}

# Install basic dependencies
install_dependencies() {
    print_status "Installing dependencies..."
    sudo apt-get install -y \
        git \
        curl \
        ca-certificates \
        gnupg \
        lsb-release \
        jq \
        htop
}

# Install Docker
install_docker() {
    if command -v docker &> /dev/null; then
        print_status "Docker already installed: $(docker --version)"
    else
        print_status "Installing Docker..."
        curl -fsSL https://get.docker.com | sudo sh
        
        # Add current user to docker group
        sudo usermod -aG docker $USER
        print_status "Added $USER to docker group"
    fi
}

# Install Docker Compose plugin
install_compose() {
    if docker compose version &> /dev/null 2>&1; then
        print_status "Docker Compose already installed: $(docker compose version)"
    else
        print_status "Installing Docker Compose plugin..."
        sudo apt-get install -y docker-compose-plugin || {
            print_warning "apt package not available, trying manual install..."
            # Manual install for older systems
            COMPOSE_VERSION=$(curl -s https://api.github.com/repos/docker/compose/releases/latest | jq -r .tag_name)
            sudo curl -L "https://github.com/docker/compose/releases/download/${COMPOSE_VERSION}/docker-compose-linux-$(uname -m)" -o /usr/local/bin/docker-compose
            sudo chmod +x /usr/local/bin/docker-compose
        }
    fi
}

# Enable I2C and SPI (for GPIO sensors)
enable_interfaces() {
    print_status "Enabling I2C and SPI interfaces..."
    
    # Enable I2C
    if ! grep -q "^dtparam=i2c_arm=on" /boot/config.txt 2>/dev/null; then
        echo "dtparam=i2c_arm=on" | sudo tee -a /boot/config.txt
        print_status "I2C enabled"
    fi
    
    # Enable SPI
    if ! grep -q "^dtparam=spi=on" /boot/config.txt 2>/dev/null; then
        echo "dtparam=spi=on" | sudo tee -a /boot/config.txt
        print_status "SPI enabled"
    fi
    
    # Load modules
    sudo modprobe i2c-dev 2>/dev/null || true
    sudo modprobe spi-bcm2835 2>/dev/null || true
}

# Create project directory
setup_project_dir() {
    print_status "Creating project directory..."
    mkdir -p ~/projects
    print_status "Project directory: ~/projects"
}

# Print next steps
print_next_steps() {
    echo ""
    echo "=========================================="
    echo "  Bootstrap Complete!"
    echo "=========================================="
    echo ""
    echo "Next steps:"
    echo ""
    echo "1. IMPORTANT: Log out and log back in (or reboot) to apply docker group:"
    echo "   ${YELLOW}sudo reboot${NC}"
    echo ""
    echo "2. After reboot, verify installations:"
    echo "   ${GREEN}docker --version${NC}"
    echo "   ${GREEN}docker compose version${NC}"
    echo ""
    echo "3. Clone the BioBridge repository:"
    echo "   ${GREEN}cd ~/projects${NC}"
    echo "   ${GREEN}git clone <REPO_URL> biobridge${NC}"
    echo "   ${GREEN}cd biobridge${NC}"
    echo ""
    echo "4. Configure and run:"
    echo "   ${GREEN}cp .env.example .env${NC}"
    echo "   ${GREEN}nano .env  # Edit configuration${NC}"
    echo "   ${GREEN}cd infra/compose${NC}"
    echo "   ${GREEN}docker compose --env-file ../../.env up -d --build${NC}"
    echo ""
    echo "5. Check status:"
    echo "   ${GREEN}docker compose ps${NC}"
    echo "   ${GREEN}curl http://localhost:8000/health${NC}"
    echo ""
}

# Main
main() {
    check_platform
    update_system
    install_dependencies
    install_docker
    install_compose
    enable_interfaces
    setup_project_dir
    print_next_steps
}

main "$@"
