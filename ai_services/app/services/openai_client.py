from app.core.config import OPENAI_API_KEY
from openai import OpenAI
from openai import AsyncOpenAI

OPENAI_CLIENT = OpenAI(api_key=OPENAI_API_KEY)

# OPENAI_CLIENT = AsyncOpenAI(api_key=OPENAI_API_KEY)