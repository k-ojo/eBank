from fastapi import APIRouter, HTTPException, status
from datetime import datetime
import uuid
from app.db.init import users_collection, accounts_collection
from app.models.user import UserRegister, UserLogin, Token
from app.utils import hash_password, verify_password, create_access_token, generate_account_number, generate_sort_code, serialize_doc

router = APIRouter(prefix="/api/auth", tags=["auth"])

@router.post("/register", response_model=dict)
async def register_user(user_data: UserRegister):
    existing_user = await users_collection.find_one({"email": user_data.email})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="User already exists"
        )
    
    user_id = str(uuid.uuid4())
    hashed_password = hash_password(user_data.password)
    
    user_doc = {
        "user_id": user_id,
        "first_name": user_data.first_name,
        "last_name": user_data.last_name,
        "email": user_data.email,
        "password": hashed_password,
        "date_of_birth": user_data.date_of_birth,
        "phone": user_data.phone,
        "address": user_data.address,
        "created_at": datetime.utcnow(),
        "is_active": True
    }
    
    await users_collection.insert_one(user_doc)
    
    account_id = str(uuid.uuid4())
    account_doc = {
        "account_id": account_id,
        "user_id": user_id,
        "account_number": generate_account_number(),
        "sort_code": generate_sort_code(),
        "account_type": "current",
        "balance": 0.00,
        "currency": "GBP",
        "status": "active",
        "created_at": datetime.utcnow()
    }
    
    await accounts_collection.insert_one(account_doc)
    
    access_token = create_access_token(data={"sub": user_data.email})
    
    return {
        "message": "User registered successfully",
        "user": {
            "id": user_id,
            "first_name": user_data.first_name,
            "last_name": user_data.last_name,
            "email": user_data.email
        },
        "account": {
            "id": account_id,
            "account_number": account_doc["account_number"],
            "sort_code": account_doc["sort_code"],
            "account_type": account_doc["account_type"]
        },
        "access_token": access_token,
        "token_type": "bearer"
    }

@router.post("/login", response_model=Token)
async def login_user(login_data: UserLogin):
    user = await users_collection.find_one({"email": login_data.email})
    if not user or not verify_password(login_data.password, user["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    access_token = create_access_token(data={"sub": login_data.email})
    return {"access_token": access_token, "token_type": "bearer"}
