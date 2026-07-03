
from langchain_core.vectorstores import VectorStoreRetriever
from langchain_chroma import Chroma
from langchain_core.documents import Document


def create_retriever(vector_store: Chroma) -> VectorStoreRetriever:

    Retriever = vector_store.as_retriever(
        search_kwargs = {"k" : 5}
    )

    return Retriever


def retrieve_documents(
    retriever: VectorStoreRetriever,
    query: str,
) -> list[Document]:

    return retriever.invoke(query)