"""
BioBridge Acquisition Manager

Orchestrates data acquisition from multiple sources, handles persistence,
and manages the acquisition loop.
"""

import asyncio
import logging
from datetime import datetime
from typing import Literal, Optional

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.database import AsyncSessionLocal
from app.db.models import Source, Measurement
from app.services.acquisition.sources.base import DataSource, Reading
from app.services.acquisition.sources.simulator import SimulatorSource
from app.services.acquisition.sources.gpio import GPIOSource, GPIONotAvailableError
from app.config import settings

logger = logging.getLogger(__name__)


class AcquisitionManager:
    """
    Manages data acquisition from multiple sources.
    
    Responsibilities:
    - Initialize and manage data sources based on mode (sim/gpio)
    - Run acquisition loop at configured interval
    - Persist readings to database
    - Handle errors and retry logic
    """
    
    def __init__(self, mode: Literal["sim", "gpio"] = "sim"):
        self.mode = mode
        self.interval = settings.acquisition_interval
        self._sources: list[DataSource] = []
        self._source_db_ids: dict[str, int] = {}  # name -> db id
        self._running = False
        self._task: Optional[asyncio.Task] = None
        self._start_time: Optional[datetime] = None
    
    async def start(self) -> None:
        """Start the acquisition manager."""
        if self._running:
            logger.warning("Acquisition manager already running")
            return
        
        logger.info(f"Starting acquisition manager in {self.mode} mode")
        
        # Initialize sources
        await self._init_sources()
        
        # Register sources in database
        await self._register_sources_in_db()
        
        # Start acquisition loop
        self._running = True
        self._start_time = datetime.utcnow()
        self._task = asyncio.create_task(self._acquisition_loop())
        
        logger.info("Acquisition manager started")
    
    async def stop(self) -> None:
        """Stop the acquisition manager."""
        logger.info("Stopping acquisition manager...")
        self._running = False
        
        if self._task:
            self._task.cancel()
            try:
                await self._task
            except asyncio.CancelledError:
                pass
        
        # Cleanup sources
        for source in self._sources:
            try:
                await source.cleanup()
            except Exception as e:
                logger.error(f"Error cleaning up source {source.name}: {e}")
        
        self._sources = []
        logger.info("Acquisition manager stopped")
    
    async def _init_sources(self) -> None:
        """Initialize data sources based on mode."""
        self._sources = []
        
        if self.mode == "sim":
            # Create simulator source
            sim = SimulatorSource(name="main_simulator")
            await sim.initialize()
            await sim.start()
            self._sources.append(sim)
            logger.info("Simulator source initialized")
            
        elif self.mode == "gpio":
            try:
                # Create GPIO source
                gpio_config = {
                    "sensors": [
                        {
                            "name": "temp_sensor",
                            "type": "i2c",
                            "address": hex(settings.gpio_sensor_addr_temp),
                            "metric": "temperature",
                            "unit": "°C",
                            "scale": 0.0625  # Example for common temp sensors
                        },
                        {
                            "name": "humidity_sensor",
                            "type": "i2c", 
                            "address": hex(settings.gpio_sensor_addr_humidity),
                            "metric": "humidity",
                            "unit": "%"
                        }
                    ]
                }
                gpio = GPIOSource(name="gpio_sensors", config=gpio_config)
                await gpio.initialize()
                await gpio.start()
                self._sources.append(gpio)
                logger.info("GPIO source initialized")
                
            except GPIONotAvailableError as e:
                logger.warning(f"GPIO not available, falling back to simulator: {e}")
                sim = SimulatorSource(name="fallback_simulator")
                await sim.initialize()
                await sim.start()
                self._sources.append(sim)
    
    async def _register_sources_in_db(self) -> None:
        """Register/update sources in database."""
        async with AsyncSessionLocal() as session:
            for source in self._sources:
                # Check if source exists
                result = await session.execute(
                    select(Source).where(Source.name == source.name)
                )
                db_source = result.scalar_one_or_none()
                
                if db_source:
                    # Update existing
                    db_source.source_type = source.source_type
                    db_source.is_active = True
                else:
                    # Create new
                    db_source = Source(
                        name=source.name,
                        source_type=source.source_type,
                        description=f"Auto-registered {source.source_type} source",
                        is_active=True
                    )
                    session.add(db_source)
                
                await session.commit()
                await session.refresh(db_source)
                self._source_db_ids[source.name] = db_source.id
                
                logger.debug(f"Registered source {source.name} with ID {db_source.id}")
    
    async def _acquisition_loop(self) -> None:
        """Main acquisition loop."""
        logger.info(f"Acquisition loop started (interval: {self.interval}s)")
        
        while self._running:
            try:
                await self._acquire_once()
            except Exception as e:
                logger.error(f"Acquisition error: {e}", exc_info=True)
            
            await asyncio.sleep(self.interval)
    
    async def _acquire_once(self) -> None:
        """Perform one acquisition cycle from all sources."""
        all_readings: list[tuple[int, Reading]] = []
        
        # Collect readings from all sources
        for source in self._sources:
            if not source.is_running:
                continue
            
            try:
                readings = await source.read()
                source_id = self._source_db_ids.get(source.name)
                
                if source_id:
                    for reading in readings:
                        all_readings.append((source_id, reading))
                        
            except Exception as e:
                logger.warning(f"Failed to read from {source.name}: {e}")
        
        # Persist to database
        if all_readings:
            await self._persist_readings(all_readings)
    
    async def _persist_readings(self, readings: list[tuple[int, Reading]]) -> None:
        """Persist readings to database."""
        async with AsyncSessionLocal() as session:
            for source_id, reading in readings:
                measurement = Measurement(
                    source_id=source_id,
                    metric_name=reading.metric_name,
                    value=reading.value,
                    unit=reading.unit,
                    timestamp=reading.timestamp,
                    metadata_json=str(reading.metadata) if reading.metadata else None
                )
                session.add(measurement)
            
            await session.commit()
            logger.debug(f"Persisted {len(readings)} measurements")
    
    def get_status(self) -> dict:
        """Get current status of the acquisition manager."""
        uptime = 0.0
        if self._start_time:
            uptime = (datetime.utcnow() - self._start_time).total_seconds()
        
        return {
            "mode": self.mode,
            "running": self._running,
            "interval_seconds": self.interval,
            "uptime_seconds": uptime,
            "sources": [s.get_status() for s in self._sources]
        }
