# 🥧 Configuración Raspberry Pi - BioBridge

Guía completa para configurar una Raspberry Pi desde cero con el proyecto BioBridge.

---

## 📋 Requisitos Previos

### Hardware
- **Raspberry Pi 4** (2GB RAM mínimo, 4GB recomendado)
- Tarjeta microSD (32GB mínimo, Clase 10)
- Fuente de alimentación USB-C (5V 3A)
- Cable Ethernet o WiFi configurado
- EmStat Pico Development Kit (para POC real)

### Software necesario en tu Mac
- [Raspberry Pi Imager](https://www.raspberrypi.com/software/)
- Terminal con SSH
- Git

---

## 🚀 Paso 1: Preparar la Tarjeta SD

### 1.1 Instalar Raspberry Pi OS

1. **Descarga e instala Raspberry Pi Imager** en tu Mac
2. **Inserta la tarjeta microSD** en tu Mac
3. **Abre Raspberry Pi Imager**
4. Configuración:
   - **OS**: `Raspberry Pi OS (64-bit)` - recomendado para mejor rendimiento
   - **Storage**: Selecciona tu tarjeta SD
   - **Configuración avanzada** (icono de engranaje ⚙️):
     - ✅ Enable SSH
     - ✅ Set username and password
       - Usuario: `pi` (o tu preferencia)
       - Password: tu contraseña
     - ✅ Configure WiFi (si no usarás Ethernet)
       - SSID: nombre de tu red
       - Password: contraseña WiFi
     - ✅ Set locale settings
       - Timezone: `America/Santiago` (o tu zona)
       - Keyboard: `es` o `us`

5. **Click "Write"** y espera a que termine (5-10 minutos)

### 1.2 Primer arranque

1. **Inserta la tarjeta SD** en la Raspberry Pi
2. **Conecta** cable Ethernet (opcional si configuraste WiFi)
3. **Enciende** la Raspberry Pi
4. **Espera 2-3 minutos** para el primer arranque

---

## 🔌 Paso 2: Conectar por SSH

### 2.1 Encontrar la IP de la Raspberry Pi

**Opción A: Si tienes acceso al router**
- Ve al panel de tu router y busca "raspberrypi" en dispositivos conectados

**Opción B: Escanear la red desde tu Mac**
```bash
# Instalar nmap si no lo tienes
brew install nmap

# Escanear tu red (ajusta el rango según tu red)
nmap -sn 192.168.1.0/24 | grep -B 2 "Raspberry"
```

**Opción C: Usar el hostname (si funciona)**
```bash
ping raspberrypi.local
```

### 2.2 Conectar por SSH

```bash
# Reemplaza <IP> con la IP encontrada
ssh pi@<IP>
# O usando hostname
ssh pi@raspberrypi.local

# Primera vez te pedirá confirmar la huella digital (escribe 'yes')
# Luego ingresa tu password
```

---

## ⚙️ Paso 3: Configuración Inicial Automática

### 3.1 Ejecutar el script de bootstrap

Una vez conectado por SSH, ejecuta:

```bash
# Opción 1: Descarga y ejecuta directamente (si ya está en GitHub)
curl -fsSL https://raw.githubusercontent.com/<tu-usuario>/biobridge/main/scripts/bootstrap_pi.sh | bash

# Opción 2: Descarga primero para revisar
cd ~
wget https://raw.githubusercontent.com/<tu-usuario>/biobridge/main/scripts/bootstrap_pi.sh
chmod +x bootstrap_pi.sh
./bootstrap_pi.sh
```

**Lo que hace el script:**
- ✅ Actualiza el sistema operativo
- ✅ Instala Git, Docker y Docker Compose
- ✅ Habilita interfaces I2C y SPI (para GPIO)
- ✅ Configura el usuario en el grupo docker
- ✅ Crea directorio de proyectos

### 3.2 Reiniciar después del bootstrap

```bash
sudo reboot
```

**Espera 1-2 minutos y vuelve a conectar por SSH**

---

## 📦 Paso 4: Clonar el Proyecto

### 4.1 Configurar Git (primera vez)

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
```

### 4.2 Clonar BioBridge

```bash
# Navegar al directorio de proyectos
cd ~/projects

# Clonar el repositorio (HTTPS)
git clone https://github.com/<tu-usuario>/biobridge.git
cd biobridge

# O con SSH (si configuraste SSH keys)
git clone git@github.com:<tu-usuario>/biobridge.git
cd biobridge
```

---

## 🔧 Paso 5: Configurar Variables de Entorno

### 5.1 Crear archivo .env

```bash
cd ~/projects/biobridge
cp .env.example .env
nano .env
```

### 5.2 Configuración para Raspberry Pi

Edita el archivo `.env` con estos valores:

```bash
# ===========================================
# BIOBRIDGE CONFIGURATION - RASPBERRY PI
# ===========================================

# --- Mode ---
# sim  = Simulated data for testing
# gpio = Real sensors via GPIO
BIOBRIDGE_MODE=sim

# --- Database ---
POSTGRES_DB=biobridge
POSTGRES_USER=biobridge_user
POSTGRES_PASSWORD=changeme_secure_password_here
DATABASE_URL=postgresql+asyncpg://biobridge_user:changeme_secure_password_here@postgres:5432/biobridge

# --- Backend ---
BACKEND_HOST=0.0.0.0
BACKEND_PORT=8000
ALLOWED_ORIGINS=http://localhost:5173,http://raspberrypi.local:5173

# --- Frontend ---
VITE_API_URL=http://raspberrypi.local:8000
VITE_REFRESH_INTERVAL_MS=5000

# --- Cloudflare Tunnel (opcional) ---
# CLOUDFLARE_TUNNEL_TOKEN=tu_token_aqui

# --- GPIO Settings (cuando uses modo gpio) ---
# I2C_BUS=1
# GPIO_PINS=4,17,27,22
```

**Importante:**
- Cambia `changeme_secure_password_here` por una contraseña segura
- Si usas Cloudflare Tunnel, añade tu token

**Guardar y salir de nano:**
- `Ctrl + O` (guardar)
- `Enter` (confirmar)
- `Ctrl + X` (salir)

---

## 🐳 Paso 6: Levantar el Stack con Docker

### 6.1 Construir e iniciar los contenedores

```bash
cd ~/projects/biobridge/infra/compose

# Primera vez: construir imágenes y levantar
docker compose --env-file ../../.env up -d --build

# Ver el progreso (esto tomará 5-10 minutos la primera vez)
docker compose logs -f
```

**Salir de los logs:** `Ctrl + C`

### 6.2 Verificar que todo esté corriendo

```bash
# Ver estado de los contenedores
docker compose ps

# Deberías ver algo como:
# NAME       SERVICE    STATUS    PORTS
# backend    backend    Up        0.0.0.0:8000->8000/tcp
# frontend   frontend   Up        0.0.0.0:5173->5173/tcp
# postgres   postgres   Up        5432/tcp
```

---

## ✅ Paso 7: Verificar Funcionamiento

### 7.1 Desde la Raspberry Pi

```bash
# Health check del backend
curl http://localhost:8000/health

# Respuesta esperada:
# {"status":"ok","mode":"sim","database_connected":true}

# Ver estado del sistema
curl http://localhost:8000/api/v1/status | jq

# Ver mediciones
curl http://localhost:8000/api/v1/measurements | jq
```

### 7.2 Desde tu Mac

Abre tu navegador y ve a:

```
http://<IP_RASPBERRY_PI>:5173
```

O si el hostname funciona:
```
http://raspberrypi.local:5173
```

**Deberías ver la landing page de BioBridge** 🎉

---

## 🔄 Paso 8: Actualizar el Código (Deploy)

Cuando hagas cambios en tu Mac y quieras actualizar la Raspberry Pi:

### 8.1 Desde tu Mac - Push a GitHub

```bash
cd /Users/cpetersen/Proyectos/biobridge
git add .
git commit -m "Descripción de cambios"
git push origin main
```

### 8.2 Desde la Raspberry Pi - Pull y Rebuild

**Opción A: Manual**
```bash
cd ~/projects/biobridge
git pull origin main
cd infra/compose
docker compose --env-file ../../.env up -d --build
```

**Opción B: Script automático**
```bash
cd ~/projects/biobridge
./scripts/deploy_pi.sh
```

---

## 🛠️ Comandos Útiles

### Docker Compose

```bash
# Ver logs en tiempo real
docker compose logs -f

# Ver logs de un servicio específico
docker compose logs -f backend

# Reiniciar un servicio
docker compose restart backend

# Detener todo
docker compose down

# Detener y eliminar volúmenes (¡cuidado! se pierden datos)
docker compose down -v

# Ver recursos (CPU, memoria)
docker stats
```

### Sistema

```bash
# Ver temperatura de la CPU
vcgencmd measure_temp

# Ver uso de disco
df -h

# Ver procesos
htop

# Ver logs del sistema
sudo journalctl -f
```

### Base de datos

```bash
# Conectar a PostgreSQL
docker exec -it postgres psql -U biobridge_user -d biobridge

# Ver tablas
\dt

# Salir
\q
```

---

## 🔌 Paso 9: Configurar EmStat Pico (Hardware Real)

### 9.1 Conectar EmStat Pico a la Raspberry Pi

**Conexión física:**
1. EmStat Pico Dev Kit → USB → Raspberry Pi
2. O mediante UART/Serial pins si usas conexión directa

### 9.2 Verificar conexión

```bash
# Listar dispositivos USB
lsusb

# Ver puertos seriales
ls -l /dev/ttyUSB* /dev/ttyACM*

# Dar permisos al usuario (si es necesario)
sudo usermod -aG dialout $USER
```

### 9.3 Cambiar a modo GPIO

```bash
nano ~/projects/biobridge/.env

# Cambiar:
BIOBRIDGE_MODE=gpio

# Guardar y reiniciar
cd ~/projects/biobridge/infra/compose
docker compose restart backend
```

### 9.4 Instalar dependencias GPIO (si es necesario)

```bash
# Editar requirements.txt
nano ~/projects/biobridge/backend/requirements.txt

# Descomentar las líneas:
RPi.GPIO==0.7.1
smbus2==0.4.3
spidev==3.6

# Rebuild del backend
cd ~/projects/biobridge/infra/compose
docker compose up -d --build backend
```

---

## 🌐 Paso 10: Exponer a Internet (Opcional)

### Opción A: Cloudflare Tunnel (Recomendado)

**Ventajas:** No abre puertos, HTTPS automático, gratis

1. **Crear túnel en Cloudflare:**
   - Ve a [Cloudflare Zero Trust](https://one.dash.cloudflare.com/)
   - Networks → Tunnels → Create Tunnel
   - Sigue el wizard y copia el token

2. **Configurar en Raspberry Pi:**
```bash
nano ~/projects/biobridge/.env

# Añadir:
CLOUDFLARE_TUNNEL_TOKEN=tu_token_de_cloudflare

# Reiniciar
cd ~/projects/biobridge/infra/compose
docker compose up -d
```

3. **Acceder desde cualquier lugar:**
   - `https://tu-subdominio.tu-dominio.com`

### Opción B: Tailscale (VPN)

```bash
# Instalar Tailscale
curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up

# Obtener IP de Tailscale
tailscale ip -4

# Acceder desde tu Mac (también con Tailscale instalado)
http://<IP_TAILSCALE>:5173
```

---

## 🔒 Seguridad

### Cambiar contraseñas por defecto

```bash
# Cambiar password de usuario pi
passwd

# Cambiar password de PostgreSQL
nano ~/projects/biobridge/.env
# Actualiza POSTGRES_PASSWORD
```

### Actualizar sistema regularmente

```bash
sudo apt update && sudo apt upgrade -y
```

### Firewall (opcional pero recomendado)

```bash
# Instalar ufw
sudo apt install ufw

# Permitir SSH
sudo ufw allow ssh

# Permitir puertos de BioBridge (solo si necesitas acceso externo directo)
sudo ufw allow 8000/tcp
sudo ufw allow 5173/tcp

# Activar firewall
sudo ufw enable
```

---

## 🐛 Troubleshooting

### Problema: No puedo conectar por SSH

**Solución:**
```bash
# Verificar que SSH está habilitado
# Conecta monitor y teclado a la Pi
sudo systemctl enable ssh
sudo systemctl start ssh
```

### Problema: Docker no funciona

**Solución:**
```bash
# Verificar que estás en el grupo docker
groups

# Si no aparece 'docker', añádete
sudo usermod -aG docker $USER
# Cerrar sesión y volver a conectar
```

### Problema: Frontend no carga

**Solución:**
```bash
# Verificar que el backend está corriendo
curl http://localhost:8000/health

# Ver logs del frontend
docker compose logs frontend

# Rebuild del frontend
docker compose up -d --build frontend
```

### Problema: Base de datos no conecta

**Solución:**
```bash
# Ver logs de PostgreSQL
docker compose logs postgres

# Verificar que el contenedor está corriendo
docker compose ps

# Reiniciar PostgreSQL
docker compose restart postgres
```

### Problema: La Raspberry Pi está lenta

**Solución:**
```bash
# Ver temperatura
vcgencmd measure_temp

# Si está >80°C, necesitas mejor refrigeración

# Ver recursos
htop

# Limpiar containers antiguos
docker system prune -a
```

---

## 📊 Monitoreo

### Script de health check

```bash
# Ejecutar health check
cd ~/projects/biobridge
./scripts/healthcheck.sh
```

### Auto-inicio en boot (opcional)

Para que BioBridge se inicie automáticamente al arrancar la Pi:

```bash
# Crear servicio systemd
sudo nano /etc/systemd/system/biobridge.service
```

Contenido:
```ini
[Unit]
Description=BioBridge Stack
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=/home/pi/projects/biobridge/infra/compose
ExecStart=/usr/bin/docker compose --env-file ../../.env up -d
ExecStop=/usr/bin/docker compose down
User=pi

[Install]
WantedBy=multi-user.target
```

Activar:
```bash
sudo systemctl daemon-reload
sudo systemctl enable biobridge.service
sudo systemctl start biobridge.service
```

---

## 🎯 Próximos Pasos

Una vez que todo funcione:

1. **Conectar EmStat Pico** y cambiar a modo `gpio`
2. **Preparar electrodos SPE** funcionalizados
3. **Ejecutar protocolo POC** según documento técnico
4. **Validar mediciones** comparando con PSTrace
5. **Exportar MethodSCRIPT** e integrar en el sistema

---

## 📚 Referencias

- [Raspberry Pi OS Documentation](https://www.raspberrypi.com/documentation/)
- [Docker on Raspberry Pi](https://docs.docker.com/engine/install/raspberry-pi-os/)
- [EmStat Pico Documentation](https://www.palmsens.com/product/emstat-pico/)
- [BioBridge README](../README.md)
- [Runbook](./runbook.md)

---

## 💡 Tips Finales

- **Backup regular**: Haz imagen de la SD cuando todo funcione
- **Monitoreo**: Usa `htop` para ver recursos
- **Logs**: Revisa logs con `docker compose logs -f`
- **Updates**: Actualiza código con `git pull` + `docker compose up -d --build`
- **Temperatura**: Usa disipadores o ventilador si la Pi se calienta

---

**¿Problemas?** Revisa los logs y la sección de Troubleshooting.

**¿Todo funcionando?** ¡Excelente! Ahora puedes empezar con el POC real 🎉
