from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload
from app.core.config import settings

SCOPES = ['https://www.googleapis.com/auth/drive.file']
SERVICE_ACCOUNT_FILE = 'path/to/service_account.json'  # <-- Update this

def upload_file_to_drive(file_path: str, filename: str, mime_type: str = 'application/octet-stream', folder: str = None) -> str:
    creds = settings.google_credentials
    service = build('drive', 'v3', credentials=creds)

    file_metadata = {'name': filename}
    if folder:
        file_metadata['parents'] = [folder]  # Upload inside this Drive folder

    media = MediaFileUpload(file_path, mimetype=mime_type)

    file = service.files().create(
        body=file_metadata,
        media_body=media,
        fields='id'
    ).execute()

    return file.get('id')
