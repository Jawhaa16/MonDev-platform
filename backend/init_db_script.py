import asyncio
from app.database import engine, Base
from app.models.user import User
from app.models.course import Course
from app.models.video import Video
from app.models.interaction import Like, Comment, Subscription
from app.models.payment import Purchase

async def init_models():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)
    print("Database initialized successfully!")

if __name__ == "__main__":
    asyncio.run(init_models())
