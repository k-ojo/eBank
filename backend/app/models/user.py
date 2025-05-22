from beanie import Document
from pydantic import EmailStr
from typing import Optional

class User(Document):
    full_name: str
    email: EmailStr
    hashed_password: str
    is_active: bool = True

    class Settings:
        name = "users"