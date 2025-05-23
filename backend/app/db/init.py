from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import settings
client = AsyncIOMotorClient(settings.MONGODB_URL)
db = client[settings.DATABASE_NAME]

users_collection = db.users
accounts_collection = db.accounts
transactions_collection = db.transactions

async def create_indexes():
    await users_collection.create_index("email", unique=True)
    await accounts_collection.create_index("user_id")
    await accounts_collection.create_index("account_number", unique=True)
    await transactions_collection.create_index("from_account_id")
    await transactions_collection.create_index("to_account_id")
    await transactions_collection.create_index("created_at")

async def close_client():
    client.close()
