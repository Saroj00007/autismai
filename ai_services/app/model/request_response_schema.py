from pydantic import BaseModel

class Request_schmea(BaseModel):
    message: str 
    user_id : str

class AutismResponse(BaseModel):
    message: str
    confidence : int
    follo_up_questions : list[str]

class Response_schema(BaseModel):
   message : str
    # risk: str
    # recommendation: list[str]