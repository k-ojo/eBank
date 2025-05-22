from fastapi import APIRouter, HTTPException
from app.models.user import User
from app.schemas.user import UserCreate, UserOut, Token
from app.services.auth import hash_password, verify_password
from app.services.jwt import create_token

router = APIRouter()

@router.post("/register", response_model=UserOut)
async def register(user: UserCreate):
    if await User.find_one(User.email == user.email):
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = User(
        full_name=user.full_name,
        email=user.email,
        hashed_password=hash_password(user.password)
    )
    await new_user.insert()

    return UserOut(
        id=str(new_user.id),
        full_name=new_user.full_name,
        email=new_user.email
    )


@router.post("/login", response_model=Token)
async def login(user: UserCreate):
    existing_user = await User.find_one(User.email == user.email)
    if not existing_user or not verify_password(user.password, existing_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_token({"sub": existing_user.email})
    return {"access_token": token, "token_type": "bearer"}
