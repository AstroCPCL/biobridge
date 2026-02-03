"""
BioBridge Database Configuration - Async SQLAlchemy
Supports both PostgreSQL and SQLite
"""

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase

from app.config import settings


def get_async_database_url() -> str:
    """Convert database URL to async version."""
    url = settings.database_url
    if url.startswith("postgresql://"):
        return url.replace("postgresql://", "postgresql+asyncpg://", 1)
    elif url.startswith("sqlite://"):
        return url.replace("sqlite://", "sqlite+aiosqlite://", 1)
    return url


def get_engine_kwargs() -> dict:
    """Get engine kwargs based on database type."""
    url = settings.database_url
    if url.startswith("sqlite"):
        # SQLite doesn't support pool settings
        return {"echo": settings.debug}
    else:
        # PostgreSQL with connection pooling
        return {
            "echo": settings.debug,
            "pool_pre_ping": True,
            "pool_size": 5,
            "max_overflow": 10
        }


# Create async engine
engine = create_async_engine(
    get_async_database_url(),
    **get_engine_kwargs()
)

# Session factory
AsyncSessionLocal = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autocommit=False,
    autoflush=False
)


# Base class for models
class Base(DeclarativeBase):
    """Base class for all SQLAlchemy models."""
    pass


# Dependency for FastAPI
async def get_db() -> AsyncSession:
    """
    Dependency that provides a database session.
    
    Usage in route:
        @router.get("/items")
        async def get_items(db: AsyncSession = Depends(get_db)):
            ...
    """
    async with AsyncSessionLocal() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()
