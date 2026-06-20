from fastapi import APIRouter
from model.request_response_schema import (Request_schmea , Response_schema)
from services.autism_services import Autism_service
from fastapi.responses import StreamingResponse

chat_router = APIRouter()

autism_service = Autism_service()


@chat_router.get("/chat-test")
async def caht_test():
    

    return {
        "status" : "healthy"
    }

@chat_router.post("/chat" ,response_model=Response_schema )
async def chat(request : Request_schmea  ):

    try:
        response =await  autism_service.generate_response(request.message , request.user_id)

        return Response_schema(
            answer=response
        )
    except Exception as e :
        
        return {
            "error" : e
        }

@chat_router.post("/chat/stream" , response_model=Response_schema)
async def stream_chat(request :Request_schmea):
    
    # streams = await autism_service.generate_stream_reponse(request.message , request.user_id)

    async def generate():

        async for chunk in autism_service.generate_stream_response(request.message , request.user_id):
            yield chunk

    return StreamingResponse(
        generate() , 
        media_type="text/plain"
    )
