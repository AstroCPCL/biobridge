"""
BioBridge Database Models
"""

from datetime import datetime
from typing import Optional
from sqlalchemy import String, Float, DateTime, Integer, Text, ForeignKey, Index
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func

from app.db.database import Base


class Source(Base):
    """Data source (sensor, simulator, etc.)."""
    
    __tablename__ = "sources"
    
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    source_type: Mapped[str] = mapped_column(String(50), nullable=False)  # sim, gpio, i2c, spi
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    config: Mapped[Optional[str]] = mapped_column(Text, nullable=True)  # JSON config
    is_active: Mapped[bool] = mapped_column(default=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), 
        server_default=func.now()
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )
    
    # Relationships
    measurements: Mapped[list["Measurement"]] = relationship(
        "Measurement", 
        back_populates="source",
        cascade="all, delete-orphan"
    )
    
    def __repr__(self) -> str:
        return f"<Source(id={self.id}, name='{self.name}', type='{self.source_type}')>"


class Measurement(Base):
    """Individual measurement reading."""
    
    __tablename__ = "measurements"
    __table_args__ = (
        Index("ix_measurements_timestamp", "timestamp"),
        Index("ix_measurements_source_timestamp", "source_id", "timestamp"),
        Index("ix_measurements_metric", "metric_name"),
    )
    
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    source_id: Mapped[int] = mapped_column(ForeignKey("sources.id"), nullable=False)
    metric_name: Mapped[str] = mapped_column(String(100), nullable=False)
    value: Mapped[float] = mapped_column(Float, nullable=False)
    unit: Mapped[str] = mapped_column(String(20), nullable=False)
    timestamp: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        index=True
    )
    metadata_json: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    
    # Relationships
    source: Mapped["Source"] = relationship("Source", back_populates="measurements")
    
    def __repr__(self) -> str:
        return f"<Measurement(id={self.id}, metric='{self.metric_name}', value={self.value})>"


class SystemLog(Base):
    """System event log."""
    
    __tablename__ = "system_logs"
    
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    level: Mapped[str] = mapped_column(String(20), nullable=False)  # INFO, WARNING, ERROR
    component: Mapped[str] = mapped_column(String(100), nullable=False)
    message: Mapped[str] = mapped_column(Text, nullable=False)
    details: Mapped[Optional[str]] = mapped_column(Text, nullable=True)  # JSON
    timestamp: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        index=True
    )
    
    def __repr__(self) -> str:
        return f"<SystemLog(id={self.id}, level='{self.level}', component='{self.component}')>"
