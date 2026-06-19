from openai import OpenAI
from core.config import OPENAI_API_KEY



class Autism_service:

    def __init__(self):
        self.client  = OpenAI(api_key=OPENAI_API_KEY)

    def generate_response(self , input_message : str) -> str:

        response = self.client.responses.create(
            model= "gpt-5-nano" , 
            input= input_message
        )

        return response.output_text;
