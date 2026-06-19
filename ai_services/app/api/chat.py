from fastapi import APIRouter
from model.request_response_schema import (Request_schmea , Response_schema)
from services.autism_services import Autism_service

chat_router = APIRouter()

autism_service = Autism_service()


@chat_router.get("/chat-test")
async def caht_test():
    

    return {
        "status" : "healthy"
    }

@chat_router.post("/chat" ,response_model=Response_schema )
async def chat(request : Request_schmea  ):
    
    response = autism_service.generate_response(request.message)

    return Response_schema(
        answer=response
    )