import asyncio
from sqlalchemy.ext.asyncio import create_async_engine
from app.database import Base
from app.models.user import User
from app.models.course import Course
from app.models.video import Video
from app.models.interaction import Like, Comment, Subscription
from app.models.payment import Purchase

async def init_models():
    # Use SQLite for local development
    engine = create_async_engine(
        'sqlite+aiosqlite:///./mondev.db',
        echo=True,
        future=True,
    )
    
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)
    
    await engine.dispose()
    print("✅ Database initialized successfully with password_hash field!")

if __name__ == "__main__":
    asyncio.run(init_models())
