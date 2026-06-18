from fastapi import APIRouter

chat_router = APIRouter()

@chat_router.get("/chat")
async def caht():
    

    return {
        "status" : "healthy"
    }