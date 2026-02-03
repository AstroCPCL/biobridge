"""
BioBridge Data Source Base Class
"""

from abc import ABC, abstractmethod
from dataclasses import dataclass
from datetime import datetime
from typing import Optional, Any


@dataclass
class Reading:
    """A single reading from a data source."""
    metric_name: str
    value: float
    unit: str
    timestamp: datetime
    metadata: Optional[dict[str, Any]] = None


class DataSource(ABC):
    """
    Abstract base class for all data sources.
    
    Implement this class to add new sensor types or data sources.
    """
    
    def __init__(self, name: str, source_type: str, config: Optional[dict] = None):
        self.name = name
        self.source_type = source_type
        self.config = config or {}
        self._is_initialized = False
        self._is_running = False
    
    @property
    def is_initialized(self) -> bool:
        return self._is_initialized
    
    @property
    def is_running(self) -> bool:
        return self._is_running
    
    async def initialize(self) -> None:
        """
        Initialize the data source (e.g., open connections, configure hardware).
        Override in subclass if needed.
        """
        self._is_initialized = True
    
    async def start(self) -> None:
        """Start the data source."""
        if not self._is_initialized:
            await self.initialize()
        self._is_running = True
    
    async def stop(self) -> None:
        """Stop the data source."""
        self._is_running = False
    
    async def cleanup(self) -> None:
        """
        Clean up resources (e.g., close connections).
        Override in subclass if needed.
        """
        self._is_initialized = False
    
    @abstractmethod
    async def read(self) -> list[Reading]:
        """
        Read current values from the data source.
        
        Returns:
            List of Reading objects with current measurements.
        """
        pass
    
    def get_status(self) -> dict[str, Any]:
        """Get current status of the data source."""
        return {
            "name": self.name,
            "type": self.source_type,
            "initialized": self._is_initialized,
            "running": self._is_running,
            "config": self.config
        }
