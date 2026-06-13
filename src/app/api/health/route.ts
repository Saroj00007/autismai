import { dbconnect } from "@/src/lib/db";
import Usermodel from "@/src/model/userModel";
import { NextResponse } from "next/server";

export async function GET(){

    try {
    const response = await dbconnect()

    if(response){
       return NextResponse.json({
        success : true , 
        message : "database connected successfully"
       })
    }
        
    } catch (error) {
       return NextResponse.json({
        success : false , 
        message : "error occured during the database connection" , 
        error : error
       })
    }

    
}