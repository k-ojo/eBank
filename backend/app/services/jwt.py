from jose import jwt
from datetime import datetime, timedelta
import os

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
EXPIRE = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))

def create_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=EXPIRE)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
