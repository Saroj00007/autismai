from langchain_core.documents import Document


def build_context(documents: list[Document]) -> str:
    sections = []

    for doc in documents:
        source = doc.metadata.get("source", "Unknown")
        page = doc.metadata.get("page", "Unknown")

        section = (
            f"Source: {source}\n"
            f"Page: {page}\n\n"
            f"{doc.page_content}"
        )

        sections.append(section)

    return "\n\n------------------------\n\n".join(sections)