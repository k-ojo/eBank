import uuid
import os
from fastapi import UploadFile
from app.services.upload_to_drive import upload_file_to_drive  # Your Drive upload helper

UPLOAD_TEMP_ROOT = "temp_uploads"

async def save_upload_file(upload_file: UploadFile, folder: str) -> str:
    ext = upload_file.filename.split('.')[-1]
    filename = f"{uuid.uuid4()}.{ext}"
    os.makedirs(UPLOAD_TEMP_ROOT, exist_ok=True)
    temp_file_path = os.path.join(UPLOAD_TEMP_ROOT, filename)

    # Save file temporarily
    with open(temp_file_path, "wb") as f:
        content = await upload_file.read()
        f.write(content)

    # Upload to Google Drive, optionally passing a Drive folder ID if you want
    drive_file_id = upload_file_to_drive(temp_file_path, filename, folder=folder)

    # Remove local temp file
    os.remove(temp_file_path)

    # Return a usable Google Drive file URL or just the file ID
    return f"https://drive.google.com/uc?id={drive_file_id}"
