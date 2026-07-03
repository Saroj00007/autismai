# app/services/rag/embedding.py
from app.core.config import OPENAI_API_KEY
from langchain_openai import OpenAIEmbeddings





embedding_model = OpenAIEmbeddings(
    model="text-embedding-3-small" 
)