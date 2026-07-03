from app.services.RAG.chunker import chunk_documents
from app.services.RAG.ingestion import load_documents

documents = load_documents("app/documents")

chunks = chunk_documents(documents)

print(chunks[1].page_content)
# print(documents)
