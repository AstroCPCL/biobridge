# BioBridge 🌱

Sistema de adquisición de datos biológicos con arquitectura replicable y desplegable en Raspberry Pi.

## Stack

- **Backend**: FastAPI (Python 3.11+)
- **Database**: PostgreSQL 15
- **Frontend**: React 18 + Vite
- **Infrastructure**: Docker Compose
- **Tunneling**: Cloudflare Tunnel (opcional)

## Requisitos

### Mac (desarrollo)
- Docker Desktop
- Git
- Node.js 18+ (opcional, para desarrollo frontend local)
- Python 3.11+ (opcional, para tests locales)

### Raspberry Pi (producción)
- Raspberry Pi OS (64-bit recomendado)
- Docker + Docker Compose plugin
- Git

## Quick Start

### 1. Clonar y configurar

```bash
git clone <REPO_URL>
cd biobridge
cp .env.example .env
# Editar .env con tus valores
```

### 2. Levantar stack (Mac o Raspberry Pi)

```bash
cd infra/compose
docker compose --env-file ../../.env up -d --build
```

### 3. Verificar

```bash
# Health check
curl http://localhost:8000/health

# Ver logs
docker compose logs -f backend

# Frontend
open http://localhost:5173
```

## Estructura del proyecto

```
biobridge/
├── README.md
├── .env.example
├── .gitignore
├── infra/
│   ├── compose/
│   │   └── docker-compose.yml
│   └── docker/
│       ├── backend.Dockerfile
│       └── frontend.Dockerfile
├── backend/
│   ├── requirements.txt
│   └── app/
│       ├── main.py
│       ├── config.py
│       ├── api/v1/
│       │   ├── __init__.py
│       │   └── routes.py
│       ├── services/
│       │   └── acquisition/
│       │       ├── __init__.py
│       │       ├── manager.py
│       │       └── sources/
│       │           ├── __init__.py
│       │           ├── base.py
│       │           ├── simulator.py
│       │           └── gpio.py
│       ├── db/
│       │   ├── __init__.py
│       │   ├── database.py
│       │   └── models.py
│       └── schemas/
│           ├── __init__.py
│           └── measurement.py
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       └── components/
├── scripts/
│   ├── bootstrap_pi.sh
│   ├── deploy_pi.sh
│   └── healthcheck.sh
└── docs/
    ├── runbook.md
    └── gpio.md
```

## Modos de operación

El backend soporta dos modos controlados por `BIOBRIDGE_MODE`:

- **sim** (default): Genera datos simulados para desarrollo/testing
- **gpio**: Usa sensores reales conectados a la Raspberry Pi

```bash
# En .env
BIOBRIDGE_MODE=sim  # o gpio
```

## Desarrollo

### Flujo Mac → Raspberry Pi

1. **Mac**: Editar código, commit, push
2. **Raspberry Pi** (via Connect Terminal):
   ```bash
   cd ~/projects/biobridge
   git pull
   cd infra/compose
   docker compose --env-file ../../.env up -d --build
   ```

### Tests locales (Mac)

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
pytest -q
```

## Exponer sin abrir puertos

### Opción 1: Cloudflare Tunnel

1. Crear túnel en Cloudflare Dashboard
2. Copiar token a `.env`: `CLOUDFLARE_TUNNEL_TOKEN=...`
3. El servicio `cloudflared` se levanta automáticamente con docker compose

### Opción 2: Tailscale

```bash
# En Raspberry Pi
curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up

# Obtener IP y usar desde Mac
ssh user@<IP_TAILSCALE>
```

## API Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/api/v1/measurements` | Listar mediciones |
| GET | `/api/v1/measurements/{id}` | Obtener medición |
| POST | `/api/v1/measurements` | Crear medición |
| GET | `/api/v1/sources` | Listar fuentes de datos |
| GET | `/api/v1/status` | Estado del sistema |

## License

MIT
