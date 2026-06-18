import { NextRequest, NextResponse } from "next/server";

import { dbconnect } from "@/src/lib/db";
import { authSchema } from "@/src/validation/auth.schema";
import { regiseterUser } from "@/src/service/auth.service";
import { success } from "zod";
import { error } from "console";

export async function POST(request: NextRequest) {
  try {
    const inputData = await request.json();

    const validatedResut = authSchema.safeParse(inputData);

    if (validatedResut.success === false) {
      return NextResponse.json(
        {
          success: false,
          message: "unable to validate the data",
          error: validatedResut.error.flatten(),
        },
        {
          status: 401, // represt the user invalid data faliure
        },
      );
    }

    await dbconnect();

    const registeredUser = await regiseterUser(validatedResut.data);

    return NextResponse.json(
      {
        success: true,
        message: "user successfully registered",
        user: {
          id: registeredUser._id,
          email: registeredUser.email,
        },
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "something went wrong",
        error: error,
      },
      { status: 500 },
    );
  } 
}
