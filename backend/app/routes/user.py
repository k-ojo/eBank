from fastapi import APIRouter, Depends, HTTPException, status
from app.services.auth import get_current_user
from app.db.init import accounts_collection
from app.utils import serialize_doc

router = APIRouter(prefix="/api/user", tags=["user"])

@router.get("/profile")
async def get_user_profile(current_user: dict = Depends(get_current_user)):
    return {
        "id": current_user["user_id"],
        "first_name": current_user["first_name"],
        "last_name": current_user["last_name"],
        "email": current_user["email"],
        "phone": current_user["phone"],
        "address": current_user["address"],
        "created_at": current_user["created_at"]
    }

@router.get("/accounts")
async def get_user_accounts(current_user: dict = Depends(get_current_user)):
    accounts_cursor = accounts_collection.find({"user_id": current_user["user_id"]})
    accounts = await accounts_cursor.to_list(length=100)
    return {"accounts": serialize_doc(accounts)}
