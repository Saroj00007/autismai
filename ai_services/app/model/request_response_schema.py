from pydantic import BaseModel

class Request_schmea(BaseModel):
    message: str 
    user_id : str

class Response_schema(BaseModel):
    answer: str
    # risk: str
    # recommendation: list[str]