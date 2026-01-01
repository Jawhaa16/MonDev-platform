import asyncio
from sqlalchemy.ext.asyncio import create_async_engine
from app.config import settings
import sys
import os

# Ensure we can import app
sys.path.append(os.getcwd())

async def test_connection():
    db_url = settings.DATABASE_URL
    # Manually fix protocol for asyncpg
    if db_url.startswith("postgresql://"):
        db_url = db_url.replace("postgresql://", "postgresql+asyncpg://", 1)
        
    print(f"Testing connection...")
    try:
        # Create engine
        engine = create_async_engine(db_url)
        
        # Try to connect
        async with engine.connect() as conn:
            print("✅ Successfully connected to the database!")
        
        await engine.dispose()
            
    except Exception as e:
        print(f"❌ Connection failed: {e}")
        sys.exit(1)

if __name__ == "__main__":
    asyncio.run(test_connection())
