from dataclasses import dataclass
from ingestion import DocumentPage

@dataclass
class Chunk: 
    id : str
    content : str
    source : str
    page_number : int

class Chunker :

    def __init__(self, chunk_size: int = 100):
        self.chunk_size = chunk_size

    def chunk_document(self, pages: list[DocumentPage]) -> list[Chunk]:

        chunks = []

        chunk_number = 1

        for page in pages:

            text = page.text

            for start in range(0, len(text), self.chunk_size):

                end = start + self.chunk_size

                chunk_text = text[start:end]

                chunks.append(
                    Chunk(
                        id=f"chunk_id : {chunk_number}",
                        content=chunk_text,
                        source=page.source,
                        page_number=page.page_number,
                    )
                )
                chunk_number = chunk_number + 1

        return chunks




        # saftey 

#         from services.rag.ingestion import DocumentPage

# class Chunker:

#     def __init__(self, chunk_size: int = 500):
#         self.chunk_size = chunk_size

#     def chunk_document(
#         self,
#         pages: list[DocumentPage]
#     ) -> list[Chunk]:

#         chunks = []

#         chunk_number = 1

#         for page in pages:

#             text = page.text

#             for start in range(0, len(text), self.chunk_size):

#                 end = start + self.chunk_size

#                 chunk_text = text[start:end]

#                 chunks.append(
#                     Chunk(
#                         id=f"chunk_{chunk_number}",
#                         content=chunk_text,
#                         source=page.source,
#                         page_number=page.page_number
#                     )
#                 )

#                 chunk_number += 1

#         return chunks
          