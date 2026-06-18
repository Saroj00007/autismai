import mongoose from "mongoose";

const mongo_url = process.env.MONGODB_URL || " "; 

// const mongo_url = "mongodb+srv://sarojstudy5856_db_user:Saroj123@cluster0.ujgchgb.mongodb.net/autismai"
 
if(!mongo_url){
    throw new Error("unable to find the mongo connection string!!");
}


if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null };
}

let cached = global.mongoose



export async function dbconnect(){
  if(cached.conn){
    return cached.conn
  }
  
   if (!cached.promise) {
    cached.promise = mongoose.connect(mongo_url).then((mongoose) => {
      return mongoose;
    });
  }

  const mongooseInstance = await cached.promise;
  cached.conn = mongooseInstance.connection; 

  return cached.conn;
}


