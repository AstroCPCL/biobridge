"""
BioBridge Configuration - Environment-based settings
"""

from typing import Literal
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )

    # Application mode
    mode: Literal["sim", "gpio"] = "sim"
    debug: bool = False
    log_level: str = "INFO"

    # Server
    host: str = "0.0.0.0"
    port: int = 8000

    # Database - SQLite by default (no compilation needed)
    # For PostgreSQL, set DATABASE_URL=postgresql://user:pass@host:5432/db
    database_url: str = "sqlite:///./biobridge.db"

    # Acquisition
    acquisition_interval: int = 5  # seconds
    acquisition_buffer_size: int = 100

    # GPIO settings (only used in gpio mode)
    gpio_i2c_bus: int = 1
    gpio_spi_bus: int = 0
    gpio_spi_device: int = 0
    gpio_sensor_addr_temp: int = 0x48
    gpio_sensor_addr_humidity: int = 0x40


class DatabaseSettings(BaseSettings):
    """Database-specific settings."""

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore"
    )

    database_url: str = "sqlite:///./biobridge.db"


class BackendSettings(BaseSettings):
    """Backend server settings."""
    
    model_config = SettingsConfigDict(
        env_prefix="BACKEND_",
        env_file=".env",
        extra="ignore"
    )
    
    host: str = "0.0.0.0"
    port: int = 8000


# Create singleton instances
settings = Settings()
db_settings = DatabaseSettings()
backend_settings = BackendSettings()
