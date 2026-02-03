"""
BioBridge GPIO Data Source

Hardware interface for Raspberry Pi GPIO, I2C, and SPI sensors.
This module is only active when BIOBRIDGE_MODE=gpio.

Note: Requires RPi.GPIO, smbus2, spidev packages (uncomment in requirements.txt)
"""

import logging
from datetime import datetime
from typing import Optional

from app.services.acquisition.sources.base import DataSource, Reading
from app.config import settings

logger = logging.getLogger(__name__)


class GPIONotAvailableError(Exception):
    """Raised when GPIO hardware is not available."""
    pass


class GPIOSource(DataSource):
    """
    GPIO data source for Raspberry Pi hardware sensors.
    
    Supports:
    - I2C sensors (temperature, humidity, pressure, etc.)
    - SPI sensors (ADC, specialized sensors)
    - Direct GPIO (digital inputs)
    
    Configuration example:
    {
        "sensors": [
            {
                "name": "temp_sensor",
                "type": "i2c",
                "address": "0x48",
                "metric": "temperature",
                "unit": "°C"
            },
            {
                "name": "humidity_sensor", 
                "type": "i2c",
                "address": "0x40",
                "metric": "humidity",
                "unit": "%"
            }
        ]
    }
    """
    
    def __init__(self, name: str = "gpio", config: Optional[dict] = None):
        super().__init__(name=name, source_type="gpio", config=config)
        
        self._gpio = None
        self._i2c_bus = None
        self._spi = None
        self._sensors = config.get("sensors", []) if config else []
    
    async def initialize(self) -> None:
        """Initialize GPIO hardware."""
        logger.info("Initializing GPIO hardware...")
        
        try:
            # Try to import GPIO libraries
            # These will fail on non-Pi systems
            import RPi.GPIO as GPIO
            import smbus2
            
            self._gpio = GPIO
            self._gpio.setmode(GPIO.BCM)
            self._gpio.setwarnings(False)
            
            # Initialize I2C
            self._i2c_bus = smbus2.SMBus(settings.gpio_i2c_bus)
            
            logger.info(f"GPIO initialized on I2C bus {settings.gpio_i2c_bus}")
            self._is_initialized = True
            
        except ImportError as e:
            logger.error(f"GPIO libraries not available: {e}")
            logger.error("Install RPi.GPIO and smbus2 on Raspberry Pi")
            raise GPIONotAvailableError(
                "GPIO libraries not installed. "
                "Run: pip install RPi.GPIO smbus2 spidev"
            )
        except Exception as e:
            logger.error(f"Failed to initialize GPIO: {e}")
            raise GPIONotAvailableError(f"GPIO initialization failed: {e}")
    
    async def cleanup(self) -> None:
        """Clean up GPIO resources."""
        if self._gpio:
            self._gpio.cleanup()
            self._gpio = None
        
        if self._i2c_bus:
            self._i2c_bus.close()
            self._i2c_bus = None
        
        if self._spi:
            self._spi.close()
            self._spi = None
        
        self._is_initialized = False
        logger.info("GPIO cleaned up")
    
    async def read(self) -> list[Reading]:
        """Read from all configured sensors."""
        if not self._is_initialized:
            raise GPIONotAvailableError("GPIO not initialized")
        
        readings = []
        now = datetime.utcnow()
        
        for sensor in self._sensors:
            try:
                value = await self._read_sensor(sensor)
                if value is not None:
                    readings.append(Reading(
                        metric_name=sensor.get("metric", sensor["name"]),
                        value=value,
                        unit=sensor.get("unit", ""),
                        timestamp=now,
                        metadata={"sensor": sensor["name"], "type": sensor["type"]}
                    ))
            except Exception as e:
                logger.warning(f"Failed to read sensor {sensor['name']}: {e}")
        
        return readings
    
    async def _read_sensor(self, sensor: dict) -> Optional[float]:
        """Read a single sensor based on its type."""
        sensor_type = sensor.get("type", "").lower()
        
        if sensor_type == "i2c":
            return await self._read_i2c(sensor)
        elif sensor_type == "spi":
            return await self._read_spi(sensor)
        elif sensor_type == "gpio":
            return await self._read_gpio_digital(sensor)
        else:
            logger.warning(f"Unknown sensor type: {sensor_type}")
            return None
    
    async def _read_i2c(self, sensor: dict) -> Optional[float]:
        """
        Read from an I2C sensor.
        
        This is a simplified implementation. Real sensors require specific
        protocols based on their datasheets.
        """
        if not self._i2c_bus:
            return None
        
        address = sensor.get("address")
        if isinstance(address, str):
            address = int(address, 16)
        
        try:
            # Generic I2C read - customize per sensor type
            # Example: Read 2 bytes and convert to temperature
            data = self._i2c_bus.read_i2c_block_data(address, 0x00, 2)
            
            # Example conversion (sensor-specific)
            raw_value = (data[0] << 8) | data[1]
            
            # Apply scaling if configured
            scale = sensor.get("scale", 1.0)
            offset = sensor.get("offset", 0.0)
            
            return round(raw_value * scale + offset, 2)
            
        except Exception as e:
            logger.debug(f"I2C read error at {hex(address)}: {e}")
            return None
    
    async def _read_spi(self, sensor: dict) -> Optional[float]:
        """Read from an SPI sensor (e.g., ADC)."""
        # Placeholder for SPI implementation
        logger.debug("SPI read not yet implemented")
        return None
    
    async def _read_gpio_digital(self, sensor: dict) -> Optional[float]:
        """Read a digital GPIO pin."""
        if not self._gpio:
            return None
        
        pin = sensor.get("pin")
        if pin is None:
            return None
        
        try:
            self._gpio.setup(pin, self._gpio.IN)
            value = self._gpio.input(pin)
            return float(value)
        except Exception as e:
            logger.debug(f"GPIO read error on pin {pin}: {e}")
            return None
