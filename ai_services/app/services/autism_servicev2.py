from app.services.RAG.rag_service import RAGservice

class AutismServicev2:

    def __init__(self, rag_service: RAGservice):
        self.rag_service = rag_service

    async def generate_response(self, message: str):
        return await self.rag_service.generate_response(message)

    async def generate_stream_response(self, message: str):
        async for chunk in self.rag_service.generate_stream_response(message):
            yield chunk
