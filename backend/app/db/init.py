# SOLUTION 1: Specify database name explicitly (Recommended)
from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
import os
from app.models.user import User
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
DATABASE_NAME = os.getenv("DATABASE_NAME", "ever_trust_bank")  # Default database name

async def init_db():
    client = AsyncIOMotorClient(MONGO_URI)
    database = client[DATABASE_NAME]  # Get database by name
    await init_beanie(database=database, document_models=[User])
    print(f"Database initialized successfully: {DATABASE_NAME}")

# ================================================================

# SOLUTION 2: Include database name in your MONGO_URI
# Change your .env file to include the database name in the URI:
# MONGO_URI=mongodb://localhost:27017/ever_trust_bank
# 
# Then your original code would work:
# 
# from motor.motor_asyncio import AsyncIOMotorClient
# from beanie import init_beanie
# import os
# from app.models.user import User
# from dotenv import load_dotenv
# 
# load_dotenv()
# 
# MONGO_URI = os.getenv("MONGO_URI")
# 
# async def init_db():
#     client = AsyncIOMotorClient(MONGO_URI)
#     await init_beanie(database=client.get_default_database(), document_models=[User])
#     print("Database initialized successfully")