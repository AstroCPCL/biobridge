"""
BioBridge API Schemas - Pydantic Models
"""

from datetime import datetime
from typing import Optional, Any
from pydantic import BaseModel, ConfigDict, Field


# =============================================================================
# Source Schemas
# =============================================================================

class SourceBase(BaseModel):
    """Base source schema."""
    name: str = Field(..., min_length=1, max_length=100)
    source_type: str = Field(..., min_length=1, max_length=50)
    description: Optional[str] = None
    config: Optional[dict[str, Any]] = None
    is_active: bool = True


class SourceCreate(SourceBase):
    """Schema for creating a source."""
    pass


class SourceUpdate(BaseModel):
    """Schema for updating a source."""
    name: Optional[str] = Field(None, min_length=1, max_length=100)
    description: Optional[str] = None
    config: Optional[dict[str, Any]] = None
    is_active: Optional[bool] = None


class SourceResponse(SourceBase):
    """Schema for source response."""
    model_config = ConfigDict(from_attributes=True)
    
    id: int
    created_at: datetime
    updated_at: datetime


# =============================================================================
# Measurement Schemas
# =============================================================================

class MeasurementBase(BaseModel):
    """Base measurement schema."""
    metric_name: str = Field(..., min_length=1, max_length=100)
    value: float
    unit: str = Field(..., min_length=1, max_length=20)
    metadata_json: Optional[dict[str, Any]] = None


class MeasurementCreate(MeasurementBase):
    """Schema for creating a measurement."""
    source_id: int
    timestamp: Optional[datetime] = None


class MeasurementResponse(MeasurementBase):
    """Schema for measurement response."""
    model_config = ConfigDict(from_attributes=True)
    
    id: int
    source_id: int
    timestamp: datetime


class MeasurementListResponse(BaseModel):
    """Schema for paginated measurement list."""
    items: list[MeasurementResponse]
    total: int
    page: int
    page_size: int
    pages: int


# =============================================================================
# System Schemas
# =============================================================================

class HealthResponse(BaseModel):
    """Health check response."""
    status: str
    mode: str
    version: str


class StatusResponse(BaseModel):
    """System status response."""
    mode: str
    acquisition_running: bool
    active_sources: int
    total_measurements: int
    uptime_seconds: float
    database_connected: bool


class AcquisitionStats(BaseModel):
    """Acquisition statistics."""
    source_id: int
    source_name: str
    measurements_count: int
    last_measurement: Optional[datetime]
    avg_value: Optional[float]
    min_value: Optional[float]
    max_value: Optional[float]
