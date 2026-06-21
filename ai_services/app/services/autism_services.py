from openai import OpenAI
from core.config import OPENAI_API_KEY
from services.memory_service import Memory_service
from openai import AsyncOpenAI

memory_services = Memory_service()

SYSTEM_PROMPT = """
You are AutismAI.

Mission:
Provide educational and supportive autism-related information.

Rules:
- Never diagnose autism.
- Never prescribe medication.
- Escalate crisis situations to professionals.
- Respect neurodiversity.

Tone:
- Warm
- Direct
- Supportive

Output:
- Clear explanation
- Practical suggestions
- Follow-up question
"""

class Autism_service:

    def __init__(self):
        self.client  = AsyncOpenAI(api_key=OPENAI_API_KEY)

    async def generate_response(self , input_message : str , user_id) -> str:

        memory_services.add_message(user_id , role="user" , content=input_message)


        history = memory_services.get_history(user_id)


        response = await self.client.responses.create(
            model= "gpt-5-nano" , 
            input= history[-10:]
        )

        memory_services.add_message(user_id , role="assistant" , content=response.output_text)

        return response.output_text;
   
    async def generate_stream_response(self , input_message , user_id):

        memory_services.add_message(user_id , role="user" , content=input_message)
        
        history = memory_services.get_history(user_id)


        streaming_response = await self.client.responses.create(
            model= "gpt-5-nano" , 
            input= history[-10:] , 
            stream = True
        )

        full_response = ""

        async for event in streaming_response : 

            if event.type == "response.output_text.delta" : 
                full_response += event.delta
                yield event.delta
        
        memory_services.add_message(user_id , role="assistant" , content=full_response)

            


         

