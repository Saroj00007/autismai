from pathlib import Path
import re
from pypdf import PdfReader
from dataclasses import dataclass

@dataclass
class DocumentPage: 
    text : str 
    page_number : int
    source : str


class DocumentLoader:

    def load_document(self, file_path: str) -> list[DocumentPage]:
        """
        Load any supported document type.
        """

        path = Path(file_path)

        if not path.exists():
            raise FileNotFoundError(f"Document not found: {file_path}")

        suffix = path.suffix.lower()

        if suffix == ".pdf":
            text = self._load_pdf(path)
        else:
            raise ValueError(f"Unsupported file type: {suffix}")

        return text

    def _load_pdf(self, path: Path) -> list[DocumentPage]:
        reader = PdfReader(path)

        pages = []

        for page_number , page in enumerate(reader.pages , start= 1):

            text = page.extract_text()

            #  yehi thau ma text clean pane gardida vayo

            if text  :
                cleaned = self.clean_text(text)
                pages.append(
                    DocumentPage(
                      page_number=page_number ,
                      text= cleaned
                    )
                )

        return pages

    def clean_text(self, text: str) -> str:
        text = re.sub(r"[ \t]+", " ", text)
        text = re.sub(r"\n{3,}", "\n\n", text)

        return text.strip()