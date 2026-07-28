from contextlib import asynccontextmanager
import time

from fastapi import FastAPI

from app.services.RAG.initialize_rag import initialize_rag
from  app.services.RAG.rag_service import RAGservice
from app.services.autism_servicev2 import AutismServicev2
from app.api.chat import chat_router
from dotenv import load_dotenv

from fastapi.middleware.cors import CORSMiddleware


load_dotenv()

@asynccontextmanager
async def lifespan(app: FastAPI):

    retriever = initialize_rag()

    rag_service = RAGservice(retriever)

    autism_service = AutismServicev2(rag_service)

    app.state.autism_service = autism_service

    print("✅ AutismAI initialized")

    yield

    print("👋 AutismAI shutting down")


app = FastAPI(lifespan=lifespan)

app.include_router(chat_router)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():

    return {
        "status": "running",
        "time": time.time(),
    }