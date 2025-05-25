import os
import base64
import json
from typing import List, Optional
from pydantic_settings import BaseSettings
from google.oauth2.service_account import Credentials
from typing import ClassVar, List

class Settings(BaseSettings):
    SECRET_KEY: str
    MONGODB_URL: str
    DATABASE_NAME: str = "btf_bank"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_HOURS: int = 24
    CORS_ORIGINS: List[str] = ["*"]
    PORT: int = 10000  # Default port, can be overridden by environment variable

    # Add the base64 encoded service account json env var
    GOOGLE_SERVICE_ACCOUNT_B64: Optional[str]
    GOOGLE_DRIVE_SCOPES: ClassVar[List[str]] = ['https://www.googleapis.com/auth/drive.file']


    GOOGLE_DRIVE_ID_CARD_FOLDER: str
    GOOGLE_DRIVE_PASSPORT_FOLDER: str

    class Config:
        extra = "allow"
        env_file = ".env"
        env_file_encoding = "utf-8"

    @property
    def google_credentials(self) -> Optional[Credentials]:
        if not self.GOOGLE_SERVICE_ACCOUNT_B64:
            return None
        try:
            decoded_json = base64.b64decode(self.GOOGLE_SERVICE_ACCOUNT_B64).decode("utf-8")
            info = json.loads(decoded_json)
            creds = Credentials.from_service_account_info(info)
            return creds.with_scopes(self.GOOGLE_DRIVE_SCOPES)
        except Exception as e:
            raise RuntimeError(f"Failed to decode Google credentials: {e}")

settings = Settings()
