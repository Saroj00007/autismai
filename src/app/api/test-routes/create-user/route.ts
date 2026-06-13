import { dbconnect } from "@/src/lib/db";
import Usermodel from "@/src/model/userModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbconnect();

    const user = await Usermodel.create({
      name: "Saroj",
      email: "saroj@gmail.com",
      password: "test123",
    });

    return NextResponse.json({
      success :true , 
      message: "user successfully created",
      user,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success : false , 
        message: "user not created error occured",
        error,
      },
      { status: 501 },
    );
  }
}
