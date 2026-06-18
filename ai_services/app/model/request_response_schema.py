from pydantic import BaseModel

class Request_schmea(BaseModel):
    message: str

class Response_schema(BaseModel):
    message: str