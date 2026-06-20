

class Memory_service:

    def __init__(self):
        self.memory_store = {}
        
    def get_history(
            self  , 
            user_id : str
    ): 
        return self.memory_store.get(user_id , [])

    def add_message(self ,user_id : str ,  role: str  , content: str):


        if user_id not in self.memory_store:
            self.memory_store[user_id] = []

        self.memory_store[user_id].append({
            "role" : role , 
            "content" : content
        })

# {
#     "user_1" :{
#         "conversation_id" : [ ... ]
#     }
# }



