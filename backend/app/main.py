from contextlib import asynccontextmanager
from fastapi import FastAPI
from app.routes import auth, user, accounts
from app.db.init import users_collection, accounts_collection, create_indexes
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from fastapi.staticfiles import StaticFiles
import os

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    print("Starting up BTF Bank API...")
    await create_indexes()
    print("Database indexes created successfully")
    
    yield
    
    # Shutdown
    print("Shutting down BTF Bank API...")
    # Add any cleanup code here if needed
    # For example, closing database connections
    print("Cleanup completed")


app = FastAPI(
    title="BTF Bank API",
    description="Banking API for BTF Bank UK",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

os.makedirs("uploads", exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

app.include_router(auth.router)
app.include_router(user.router)
app.include_router(accounts.router)

@app.get("/")
async def root():
    return {"message": " to BTF Bank API"}

@app.get("/health")
async def health_check():
    return {
        "status": "OK",
        "message": "BTF Bank API is running",
        "version": "1.0.0"
    }

if __name__ == "__main__":
    port = settings.PORT # Render provides PORT, fallback to 10000
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=False)