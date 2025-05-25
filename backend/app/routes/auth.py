from fastapi import APIRouter, HTTPException, status
from datetime import datetime
import uuid
from app.db.init import users_collection, accounts_collection
from app.models.user import UserRegister, UserLogin, Token
from app.utils import hash_password, verify_password, create_access_token, generate_account_number, generate_sort_code, serialize_doc
from fastapi import Form, UploadFile, File
from app.services.file import save_upload_file  
from fastapi import APIRouter, UploadFile, File, HTTPException
import shutil
import os
from app.services.upload_to_drive import upload_file_to_drive
from app.core.config import settings

router = APIRouter(prefix="/api/files", tags=["files"])

UPLOAD_DIR = "temp_uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/register", response_model=dict)
async def register_user(
    fullName: str = Form(...),
    email: str = Form(...),
    phone: str = Form(...),
    country: str = Form(...),
    dob: str = Form(...),
    password: str = Form(...),
    confirmPassword: str = Form(...),
    referralCode: str = Form(""),
    idCard: UploadFile = File(None),
    passportPhoto: UploadFile = File(None)
):
    # Check password confirmation
    if password != confirmPassword:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password and confirm password do not match"
        )
    
    existing_user = await users_collection.find_one({"email": email})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="User already exists"
        )

    user_id = str(uuid.uuid4())
    hashed_password = hash_password(password)

    # Save files if provided
    id_card_url = None
    if idCard is not None:
        id_card_url = await save_upload_file(idCard, folder=settings.GOOGLE_DRIVE_ID_CARD_FOLDER)
    
    passport_url = None
    if passportPhoto is not None:
        passport_url = await save_upload_file(passportPhoto, folder=settings.GOOGLE_DRIVE_PASSPORT_FOLDER)

    # Assuming fullName has both first and last names
    # You can split or store as is depending on your model
    first_name, *last_name_parts = fullName.strip().split(" ")
    last_name = " ".join(last_name_parts) if last_name_parts else ""

    user_doc = {
    "user_id": user_id,
    "fullName": fullName,
    "email": email,
    "phone": phone,
    "country": country,
    "dob": dob,  # make sure it is stored as string or date, whatever you want
    "password": hashed_password,
    "referralCode": referralCode,
    # plus your file URLs if any
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

    access_token = create_access_token(data={"sub": email})

    return {
        "message": "User registered successfully",
        "user": {
            "id": user_id,
            "first_name": first_name,
            "last_name": last_name,
            "email": email
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


@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        drive_file_id = upload_file_to_drive(file_path, file.filename)
        os.remove(file_path)  # Clean up temp file
        return {"message": "File uploaded successfully", "drive_file_id": drive_file_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



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
