"""Initialize database tables."""
import asyncio
from sqlalchemy import text
from app.database import engine, Base
# Import all models to register them with Base
from app.models.user import User
from app.models.course import Course
from app.models.video import Video
from app.models.interaction import Subscription, Like, Comment


async def init_db():
    """Create all database tables."""
    async with engine.begin() as conn:
        # Drop all tables (for development only)
        await conn.run_sync(Base.metadata.drop_all)
        # Create all tables
        await conn.run_sync(Base.metadata.create_all)
    print("✅ Database tables created successfully!")


if __name__ == "__main__":
    asyncio.run(init_db())
