"""
BioBridge Backend - Main Application Entry Point
"""

import asyncio
import logging
from pathlib import Path
from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

from app.config import settings

# Static files directory (frontend build)
STATIC_DIR = Path(__file__).parent.parent / "static"
from app.api.v1.routes import router as api_router
from app.db.database import engine, Base
from app.services.acquisition.manager import AcquisitionManager

# Configure logging
logging.basicConfig(
    level=getattr(logging, settings.log_level),
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

# Global acquisition manager instance
acquisition_manager: AcquisitionManager | None = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan: startup and shutdown events."""
    global acquisition_manager
    
    # Startup
    logger.info(f"Starting BioBridge in {settings.mode} mode...")
    
    # Create database tables
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    logger.info("Database tables created/verified")
    
    # Start acquisition manager
    acquisition_manager = AcquisitionManager(mode=settings.mode)
    await acquisition_manager.start()
    logger.info(f"Acquisition manager started (interval: {settings.acquisition_interval}s)")
    
    yield
    
    # Shutdown
    logger.info("Shutting down BioBridge...")
    if acquisition_manager:
        await acquisition_manager.stop()
    logger.info("Shutdown complete")


# Create FastAPI app
app = FastAPI(
    title="BioBridge API",
    description="Biological data acquisition and monitoring system",
    version="0.1.0",
    lifespan=lifespan,
    docs_url="/docs" if settings.debug else None,
    redoc_url="/redoc" if settings.debug else None,
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(api_router, prefix="/api/v1")


# =============================================================================
# Health & Status Endpoints
# =============================================================================

@app.get("/health")
async def health_check():
    """Health check endpoint for monitoring and load balancers."""
    return {
        "status": "healthy",
        "mode": settings.mode,
        "version": "0.1.0"
    }


# =============================================================================
# Static Files & SPA Routing
# =============================================================================

# Mount static assets (JS, CSS, images)
if STATIC_DIR.exists():
    app.mount("/assets", StaticFiles(directory=STATIC_DIR / "assets"), name="assets")


@app.get("/{full_path:path}")
async def serve_spa(request: Request, full_path: str):
    """Serve the SPA frontend for all non-API routes."""
    # If it's an API route, this won't be reached (API routes are registered first)
    index_file = STATIC_DIR / "index.html"
    if index_file.exists():
        return FileResponse(index_file)
    # Fallback for API-only mode
    return {
        "name": "BioBridge API",
        "version": "0.1.0",
        "mode": settings.mode,
        "docs": "/docs" if settings.debug else "disabled",
        "health": "/health"
    }


# =============================================================================
# Development Runner
# =============================================================================

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host=settings.host,
        port=settings.port,
        reload=settings.debug
    )
