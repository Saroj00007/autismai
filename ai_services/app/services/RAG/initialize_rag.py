from app.services.RAG.ingestion import load_documents
from app.services.RAG.chunker import chunk_documents
from app.services.RAG.vector_store import create_vector_store
from app.services.RAG.retriver import create_retriever
from langchain_core.vectorstores import VectorStoreRetriever


def initialize_rag() -> VectorStoreRetriever:
    documents = load_documents("app/documents") 

    chunked_docs = chunk_documents(documents)

    vector_store = create_vector_store(chunked_docs)

    retriever  = create_retriever(vector_store)

    return retriever

    