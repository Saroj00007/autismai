from services.RAG.ingestion import load_documents

documents = load_documents("app/documents")

print(documents)
