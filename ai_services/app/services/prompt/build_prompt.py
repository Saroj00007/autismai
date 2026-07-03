from langchain_core.documents import Document

def build_user_prompt(question : str , context : str) -> str  : 

    return f"""
       context: 
          {context}

       user_question : 
           {question}
          """