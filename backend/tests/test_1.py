import base64
import json
from dotenv import load_dotenv
import os

load_dotenv()
b64_string = os.getenv("GOOGLE_SERVICE_ACCOUNT_B64")

try:
    decoded = base64.b64decode(b64_string).decode("utf-8")
    print(decoded)  # Should print valid JSON string
    data = json.loads(decoded)  # Should not error
    print("Decoded JSON keys:", data.keys())
except Exception as e:
    print("Error decoding:", e)
