from fastapi import FastAPI
import time
from api.chat import chat_router



app  = FastAPI()

app.include_router(chat_router)

@app.get("/")
async def root():
    

    return {
        "status" : "running" , 
        "time" : time.time()
    }