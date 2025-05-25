from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: str
    full_name: str
    email: EmailStr

class Token(BaseModel):
    access_token: str
    token_type: str
