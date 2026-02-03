# BioBridge Runbook

Guía operacional para administrar BioBridge en producción.

## Índice

1. [Quick Commands](#quick-commands)
2. [Deployment](#deployment)
3. [Troubleshooting](#troubleshooting)
4. [Maintenance](#maintenance)
5. [Monitoring](#monitoring)
6. [Backup & Recovery](#backup--recovery)

---

## Quick Commands

### Estado del sistema

```bash
# Ver estado de todos los contenedores
cd ~/projects/biobridge/infra/compose
docker compose ps

# Health check rápido
curl http://localhost:8000/health | jq .

# Script de diagnóstico completo
./scripts/healthcheck.sh
```

### Logs

```bash
cd ~/projects/biobridge/infra/compose

# Todos los servicios
docker compose logs -f

# Solo backend
docker compose logs -f backend

# Últimas 100 líneas
docker compose logs --tail=100 backend

# Con timestamps
docker compose logs -t backend
```

### Reiniciar servicios

```bash
cd ~/projects/biobridge/infra/compose

# Reiniciar todo
docker compose restart

# Reiniciar solo backend
docker compose restart backend

# Rebuild y restart
docker compose up -d --build backend
```

### Detener/Iniciar

```bash
# Detener (conserva datos)
docker compose down

# Detener y eliminar volúmenes (⚠️ BORRA DATOS)
docker compose down -v

# Iniciar
docker compose up -d
```

---

## Deployment

### Primer deployment

```bash
# 1. Clonar repositorio
cd ~/projects
git clone <REPO_URL> biobridge
cd biobridge

# 2. Configurar
cp .env.example .env
nano .env  # Editar configuración

# 3. Iniciar
cd infra/compose
docker compose --env-file ../../.env up -d --build

# 4. Verificar
docker compose ps
curl http://localhost:8000/health
```

### Actualización (deployment continuo)

```bash
# Opción A: Script automático
./scripts/deploy_pi.sh

# Opción B: Manual
cd ~/projects/biobridge
git pull
cd infra/compose
docker compose --env-file ../../.env up -d --build
```

### Rollback

```bash
# Ver commits anteriores
git log --oneline -10

# Volver a un commit específico
git checkout <COMMIT_HASH>

# Rebuild
cd infra/compose
docker compose --env-file ../../.env up -d --build

# Para volver a main
git checkout main
```

---

## Troubleshooting

### El backend no inicia

1. **Verificar logs:**
   ```bash
   docker compose logs backend
   ```

2. **Problemas comunes:**
   - Database no disponible: esperar a que `db` esté healthy
   - Puerto en uso: verificar con `sudo lsof -i :8000`
   - Variables de entorno: revisar `.env`

3. **Reiniciar limpio:**
   ```bash
   docker compose down
   docker compose up -d --build
   ```

### Database no conecta

1. **Verificar que PostgreSQL está corriendo:**
   ```bash
   docker compose ps db
   docker compose logs db
   ```

2. **Probar conexión:**
   ```bash
   docker compose exec db psql -U biobridge -d biobridge -c "\l"
   ```

3. **Resetear database (⚠️ BORRA DATOS):**
   ```bash
   docker compose down -v
   docker compose up -d
   ```

### Frontend no carga

1. **Verificar nginx:**
   ```bash
   docker compose logs frontend
   ```

2. **Verificar que el build está actualizado:**
   ```bash
   docker compose build frontend
   docker compose up -d frontend
   ```

3. **Probar directamente:**
   ```bash
   curl -I http://localhost:5173
   ```

### GPIO no funciona (modo gpio)

1. **Verificar permisos:**
   ```bash
   ls -la /dev/gpiomem
   ls -la /dev/i2c-*
   ```

2. **Verificar que el contenedor tiene acceso:**
   - Descomentar `privileged: true` y `devices` en docker-compose.yml

3. **Probar I2C:**
   ```bash
   sudo i2cdetect -y 1
   ```

### Contenedor se reinicia constantemente

1. **Ver logs de crash:**
   ```bash
   docker compose logs --tail=50 <service>
   ```

2. **Verificar recursos:**
   ```bash
   docker stats
   free -h
   df -h
   ```

3. **Aumentar memoria swap si es necesario:**
   ```bash
   sudo dphys-swapfile swapoff
   sudo nano /etc/dphys-swapfile  # CONF_SWAPSIZE=2048
   sudo dphys-swapfile setup
   sudo dphys-swapfile swapon
   ```

---

## Maintenance

### Limpiar recursos Docker

```bash
# Imágenes no usadas
docker image prune -f

# Todos los recursos no usados
docker system prune -f

# Ver uso de disco
docker system df
```

### Actualizar dependencias

```bash
# Backend (en desarrollo)
cd backend
pip install --upgrade -r requirements.txt

# Frontend (en desarrollo)
cd frontend
npm update
```

### Rotar logs

```bash
# Configurar logrotate para Docker
sudo nano /etc/logrotate.d/docker-containers

# Contenido:
# /var/lib/docker/containers/*/*.log {
#     rotate 7
#     daily
#     compress
#     missingok
#     delaycompress
#     copytruncate
# }
```

---

## Monitoring

### Métricas del sistema

```bash
# CPU, memoria, disco
htop
df -h
free -h

# Temperatura (Raspberry Pi)
vcgencmd measure_temp
```

### Métricas de Docker

```bash
# Stats en tiempo real
docker stats

# Eventos
docker events
```

### Healthchecks automáticos

Los contenedores tienen healthchecks configurados. Docker reiniciará automáticamente los contenedores unhealthy.

Para verificar:
```bash
docker inspect --format='{{.State.Health.Status}}' biobridge-backend
```

---

## Backup & Recovery

### Backup de base de datos

```bash
# Crear backup
docker compose exec -T db pg_dump -U biobridge biobridge > backup_$(date +%Y%m%d_%H%M%S).sql

# O con compresión
docker compose exec -T db pg_dump -U biobridge biobridge | gzip > backup_$(date +%Y%m%d).sql.gz
```

### Restaurar backup

```bash
# Desde archivo SQL
cat backup.sql | docker compose exec -T db psql -U biobridge -d biobridge

# Desde archivo comprimido
gunzip -c backup.sql.gz | docker compose exec -T db psql -U biobridge -d biobridge
```

### Backup automatizado (cron)

```bash
# Editar crontab
crontab -e

# Agregar (backup diario a las 2am)
0 2 * * * cd ~/projects/biobridge/infra/compose && docker compose exec -T db pg_dump -U biobridge biobridge | gzip > ~/backups/biobridge_$(date +\%Y\%m\%d).sql.gz
```

### Backup completo del proyecto

```bash
# Todo el directorio (excluyendo datos de Docker)
tar -czvf biobridge_config_backup.tar.gz \
    --exclude='*.pyc' \
    --exclude='__pycache__' \
    --exclude='node_modules' \
    --exclude='.git' \
    ~/projects/biobridge/.env \
    ~/projects/biobridge/*.md
```

---

## Contacto y Escalación

- **Repositorio:** <REPO_URL>
- **Issues:** <REPO_URL>/issues
- **Documentación:** `docs/` en el repositorio
