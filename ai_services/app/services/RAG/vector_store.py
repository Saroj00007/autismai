from langchain_core.documents import Document
from langchain_chroma import Chroma

from app.services.RAG.embeddings import embedding_model

CHROMA_DB_DIR = "data/chroma"
COLLECTION_NAME = "autism_knowledge"


def create_vector_store(
    documents: list[Document],
) -> Chroma:

    vector_store = Chroma.from_documents(
        documents=documents,
        embedding=embedding_model,
        persist_directory=CHROMA_DB_DIR,
        collection_name=COLLECTION_NAME,
    )

    return vector_store

    