from app.services.prompt.system_prompt import SYSTEM_INSTRUCTIONS
from app.services.prompt.build_prompt import build_user_prompt

# from services.RAG.retriver import create_retriever 
# from services.RAG.retriver import retrieve_documents

from app.services.RAG.context_builder import build_context
# from services.RAG.vector_store import create_vector_store
# from services.RAG.ingestion import load_documents
# from services.RAG.chunker import chunk_documents
# from services.openai_client import OPENAI_CLIENT

from openai import AsyncOpenAI
from app.core.config import OPENAI_API_KEY




from langchain_core.vectorstores import VectorStoreRetriever

from app.model.request_response_schema import AutismResponse


class RAGservice : 

    def __init__(self ,retriever  : VectorStoreRetriever ):
        self.client = AsyncOpenAI(api_key=OPENAI_API_KEY)
        self.retriever = retriever

    async def generate_response(self  , question : str) -> AutismResponse | None : 
    
        # ret_documents = retrieve_documents(retriever=self.retriever , query=question)
        ret_documents = self.retriever.invoke(question)
    
        context = build_context(documents=ret_documents)
    
        prompt = build_user_prompt(question=question , context= context)
    
        response = await self.client.responses.parse(
            model="gpt-5-nano" , 
            input=prompt , 
            text_format=AutismResponse , 
            instructions=SYSTEM_INSTRUCTIONS
        )
    
        return response.output_parsed

    
     

