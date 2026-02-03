"""
BioBridge Simulator Data Source

Generates realistic simulated biological/environmental data for development
and testing without requiring actual hardware.
"""

import random
import math
from datetime import datetime
from typing import Optional

from app.services.acquisition.sources.base import DataSource, Reading


class SimulatorSource(DataSource):
    """
    Simulator that generates realistic sensor data.
    
    Simulates multiple metrics with realistic patterns:
    - Temperature: Sinusoidal daily pattern with noise
    - Humidity: Inverse correlation with temperature
    - pH: Slow drift with occasional adjustments
    - Dissolved Oxygen: Correlated with temperature
    - Light Level: Day/night cycle
    """
    
    # Default configuration
    DEFAULT_CONFIG = {
        "temperature": {
            "enabled": True,
            "base": 25.0,       # Base temperature (°C)
            "amplitude": 3.0,   # Daily variation amplitude
            "noise": 0.5,       # Random noise
            "unit": "°C"
        },
        "humidity": {
            "enabled": True,
            "base": 60.0,       # Base humidity (%)
            "amplitude": 10.0,
            "noise": 2.0,
            "unit": "%"
        },
        "ph": {
            "enabled": True,
            "base": 7.0,        # Neutral pH
            "drift": 0.01,      # Slow drift rate
            "noise": 0.05,
            "unit": "pH"
        },
        "dissolved_oxygen": {
            "enabled": True,
            "base": 8.0,        # mg/L
            "temp_coefficient": -0.2,  # Decreases with temperature
            "noise": 0.3,
            "unit": "mg/L"
        },
        "light_level": {
            "enabled": True,
            "day_value": 1000.0,   # lux
            "night_value": 10.0,
            "noise": 50.0,
            "unit": "lux"
        }
    }
    
    def __init__(self, name: str = "simulator", config: Optional[dict] = None):
        super().__init__(name=name, source_type="sim", config=config)
        
        # Merge with defaults
        self._config = {**self.DEFAULT_CONFIG}
        if config:
            for key, value in config.items():
                if key in self._config and isinstance(value, dict):
                    self._config[key].update(value)
                else:
                    self._config[key] = value
        
        # Internal state for realistic patterns
        self._ph_drift = 0.0
        self._last_temp = None
        self._tick = 0
    
    async def read(self) -> list[Reading]:
        """Generate simulated readings."""
        readings = []
        now = datetime.utcnow()
        self._tick += 1
        
        # Time-based factors
        hour = now.hour + now.minute / 60.0
        day_factor = math.sin((hour - 6) * math.pi / 12)  # Peak at noon
        
        # Temperature
        if self._config["temperature"]["enabled"]:
            cfg = self._config["temperature"]
            temp = (
                cfg["base"] 
                + cfg["amplitude"] * day_factor
                + random.gauss(0, cfg["noise"])
            )
            self._last_temp = temp
            readings.append(Reading(
                metric_name="temperature",
                value=round(temp, 2),
                unit=cfg["unit"],
                timestamp=now
            ))
        
        # Humidity (inverse correlation with temperature)
        if self._config["humidity"]["enabled"]:
            cfg = self._config["humidity"]
            humidity = (
                cfg["base"]
                - cfg["amplitude"] * day_factor  # Inverse of temp
                + random.gauss(0, cfg["noise"])
            )
            humidity = max(20, min(95, humidity))  # Clamp to realistic range
            readings.append(Reading(
                metric_name="humidity",
                value=round(humidity, 1),
                unit=cfg["unit"],
                timestamp=now
            ))
        
        # pH with slow drift
        if self._config["ph"]["enabled"]:
            cfg = self._config["ph"]
            self._ph_drift += random.gauss(0, cfg["drift"])
            self._ph_drift = max(-0.5, min(0.5, self._ph_drift))  # Limit drift
            
            # Occasional "adjustment" (simulate buffer addition)
            if random.random() < 0.01:
                self._ph_drift *= 0.5
            
            ph = cfg["base"] + self._ph_drift + random.gauss(0, cfg["noise"])
            ph = max(4, min(10, ph))  # Realistic pH range
            readings.append(Reading(
                metric_name="ph",
                value=round(ph, 2),
                unit=cfg["unit"],
                timestamp=now
            ))
        
        # Dissolved Oxygen (decreases with higher temperature)
        if self._config["dissolved_oxygen"]["enabled"]:
            cfg = self._config["dissolved_oxygen"]
            temp_effect = 0
            if self._last_temp:
                temp_effect = cfg["temp_coefficient"] * (self._last_temp - 25)
            
            do = cfg["base"] + temp_effect + random.gauss(0, cfg["noise"])
            do = max(2, min(14, do))  # Realistic DO range
            readings.append(Reading(
                metric_name="dissolved_oxygen",
                value=round(do, 2),
                unit=cfg["unit"],
                timestamp=now
            ))
        
        # Light Level (day/night cycle)
        if self._config["light_level"]["enabled"]:
            cfg = self._config["light_level"]
            # Simple day/night: day is 6am-6pm
            is_day = 6 <= hour < 18
            
            if is_day:
                # Bell curve during day
                day_progress = (hour - 6) / 12  # 0 to 1 during day
                light_factor = math.sin(day_progress * math.pi)
                light = cfg["night_value"] + (cfg["day_value"] - cfg["night_value"]) * light_factor
            else:
                light = cfg["night_value"]
            
            light += random.gauss(0, cfg["noise"])
            light = max(0, light)
            readings.append(Reading(
                metric_name="light_level",
                value=round(light, 1),
                unit=cfg["unit"],
                timestamp=now
            ))
        
        return readings
