from services.RAG.ingestion import DocumentLoader

pdf_reader = DocumentLoader()

text = pdf_reader.load_document("app/documents/dummy.pdf")

print(text)
