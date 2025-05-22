from fastapi import FastAPI
from contextlib import asynccontextmanager
from app.db.init import init_db
from app.routes import auth
from fastapi.middleware.cors import CORSMiddleware


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()  # Initialize MongoDB
    yield  # App is running

app = FastAPI(lifespan=lifespan)

app.include_router(auth.router)



app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello, World!"}

