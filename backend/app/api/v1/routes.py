"""
BioBridge API v1 Routes
"""

import logging
from datetime import datetime
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.database import get_db
from app.db.models import Source, Measurement
from app.schemas import (
    SourceCreate,
    SourceUpdate,
    SourceResponse,
    MeasurementCreate,
    MeasurementResponse,
    MeasurementListResponse,
    StatusResponse,
    AcquisitionStats
)
from app.config import settings

logger = logging.getLogger(__name__)
router = APIRouter()


# =============================================================================
# Sources
# =============================================================================

@router.get("/sources", response_model=list[SourceResponse], tags=["Sources"])
async def list_sources(
    active_only: bool = Query(False, description="Filter only active sources"),
    db: AsyncSession = Depends(get_db)
):
    """List all data sources."""
    query = select(Source)
    if active_only:
        query = query.where(Source.is_active == True)
    query = query.order_by(Source.name)
    
    result = await db.execute(query)
    sources = result.scalars().all()
    return sources


@router.get("/sources/{source_id}", response_model=SourceResponse, tags=["Sources"])
async def get_source(source_id: int, db: AsyncSession = Depends(get_db)):
    """Get a specific source by ID."""
    result = await db.execute(select(Source).where(Source.id == source_id))
    source = result.scalar_one_or_none()
    
    if not source:
        raise HTTPException(status_code=404, detail="Source not found")
    return source


@router.post("/sources", response_model=SourceResponse, status_code=201, tags=["Sources"])
async def create_source(source: SourceCreate, db: AsyncSession = Depends(get_db)):
    """Create a new data source."""
    # Check if name already exists
    existing = await db.execute(select(Source).where(Source.name == source.name))
    if existing.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Source name already exists")
    
    db_source = Source(
        name=source.name,
        source_type=source.source_type,
        description=source.description,
        config=str(source.config) if source.config else None,
        is_active=source.is_active
    )
    db.add(db_source)
    await db.commit()
    await db.refresh(db_source)
    return db_source


@router.patch("/sources/{source_id}", response_model=SourceResponse, tags=["Sources"])
async def update_source(
    source_id: int,
    source: SourceUpdate,
    db: AsyncSession = Depends(get_db)
):
    """Update a source."""
    result = await db.execute(select(Source).where(Source.id == source_id))
    db_source = result.scalar_one_or_none()
    
    if not db_source:
        raise HTTPException(status_code=404, detail="Source not found")
    
    update_data = source.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        if field == "config" and value is not None:
            value = str(value)
        setattr(db_source, field, value)
    
    await db.commit()
    await db.refresh(db_source)
    return db_source


# =============================================================================
# Measurements
# =============================================================================

@router.get("/measurements", response_model=MeasurementListResponse, tags=["Measurements"])
async def list_measurements(
    source_id: Optional[int] = Query(None, description="Filter by source ID"),
    metric_name: Optional[str] = Query(None, description="Filter by metric name"),
    start_time: Optional[datetime] = Query(None, description="Start timestamp filter"),
    end_time: Optional[datetime] = Query(None, description="End timestamp filter"),
    page: int = Query(1, ge=1, description="Page number"),
    page_size: int = Query(50, ge=1, le=1000, description="Items per page"),
    db: AsyncSession = Depends(get_db)
):
    """List measurements with optional filters and pagination."""
    # Base query
    query = select(Measurement)
    count_query = select(func.count(Measurement.id))
    
    # Apply filters
    if source_id:
        query = query.where(Measurement.source_id == source_id)
        count_query = count_query.where(Measurement.source_id == source_id)
    if metric_name:
        query = query.where(Measurement.metric_name == metric_name)
        count_query = count_query.where(Measurement.metric_name == metric_name)
    if start_time:
        query = query.where(Measurement.timestamp >= start_time)
        count_query = count_query.where(Measurement.timestamp >= start_time)
    if end_time:
        query = query.where(Measurement.timestamp <= end_time)
        count_query = count_query.where(Measurement.timestamp <= end_time)
    
    # Get total count
    total_result = await db.execute(count_query)
    total = total_result.scalar()
    
    # Apply pagination
    offset = (page - 1) * page_size
    query = query.order_by(Measurement.timestamp.desc()).offset(offset).limit(page_size)
    
    result = await db.execute(query)
    measurements = result.scalars().all()
    
    pages = (total + page_size - 1) // page_size
    
    return MeasurementListResponse(
        items=measurements,
        total=total,
        page=page,
        page_size=page_size,
        pages=pages
    )


@router.get("/measurements/{measurement_id}", response_model=MeasurementResponse, tags=["Measurements"])
async def get_measurement(measurement_id: int, db: AsyncSession = Depends(get_db)):
    """Get a specific measurement by ID."""
    result = await db.execute(select(Measurement).where(Measurement.id == measurement_id))
    measurement = result.scalar_one_or_none()
    
    if not measurement:
        raise HTTPException(status_code=404, detail="Measurement not found")
    return measurement


@router.post("/measurements", response_model=MeasurementResponse, status_code=201, tags=["Measurements"])
async def create_measurement(
    measurement: MeasurementCreate,
    db: AsyncSession = Depends(get_db)
):
    """Create a new measurement (typically done by acquisition service)."""
    # Verify source exists
    source_result = await db.execute(select(Source).where(Source.id == measurement.source_id))
    if not source_result.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Source not found")
    
    db_measurement = Measurement(
        source_id=measurement.source_id,
        metric_name=measurement.metric_name,
        value=measurement.value,
        unit=measurement.unit,
        timestamp=measurement.timestamp or datetime.utcnow(),
        metadata_json=str(measurement.metadata_json) if measurement.metadata_json else None
    )
    db.add(db_measurement)
    await db.commit()
    await db.refresh(db_measurement)
    return db_measurement


# =============================================================================
# Status & Stats
# =============================================================================

@router.get("/status", response_model=StatusResponse, tags=["System"])
async def get_status(db: AsyncSession = Depends(get_db)):
    """Get system status."""
    # Count active sources
    sources_result = await db.execute(
        select(func.count(Source.id)).where(Source.is_active == True)
    )
    active_sources = sources_result.scalar()
    
    # Count total measurements
    measurements_result = await db.execute(select(func.count(Measurement.id)))
    total_measurements = measurements_result.scalar()
    
    return StatusResponse(
        mode=settings.mode,
        acquisition_running=True,  # TODO: Get from acquisition manager
        active_sources=active_sources,
        total_measurements=total_measurements,
        uptime_seconds=0.0,  # TODO: Calculate actual uptime
        database_connected=True
    )


@router.get("/stats", response_model=list[AcquisitionStats], tags=["System"])
async def get_acquisition_stats(db: AsyncSession = Depends(get_db)):
    """Get acquisition statistics per source."""
    query = """
        SELECT 
            s.id as source_id,
            s.name as source_name,
            COUNT(m.id) as measurements_count,
            MAX(m.timestamp) as last_measurement,
            AVG(m.value) as avg_value,
            MIN(m.value) as min_value,
            MAX(m.value) as max_value
        FROM sources s
        LEFT JOIN measurements m ON s.id = m.source_id
        WHERE s.is_active = true
        GROUP BY s.id, s.name
        ORDER BY s.name
    """
    result = await db.execute(query)
    rows = result.fetchall()
    
    return [
        AcquisitionStats(
            source_id=row.source_id,
            source_name=row.source_name,
            measurements_count=row.measurements_count or 0,
            last_measurement=row.last_measurement,
            avg_value=row.avg_value,
            min_value=row.min_value,
            max_value=row.max_value
        )
        for row in rows
    ]
