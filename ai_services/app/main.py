from fastapi import FastAPI
import time
from ai_services.app.services.RAG.initialize_rag import initialize_rag
from ai_services.app.services.RAG.rag_service import RAGservice
from ai_services.app.services.autism_servicev2 import AutismServicev2
from api.chat import chat_router



app  = FastAPI()

app.include_router(chat_router)

@app.get("/")
async def root():   
    

    return {
        "status" : "running" , 
        "time" : time.time()
    }