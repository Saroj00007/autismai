import { dbconnect } from "@/src/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const connection = await dbconnect();

    if (connection) {
      return NextResponse.json(
        { success: true, message: "database connected successfully" },
        { status: 200 },
      );
    }

    return NextResponse.json(
      { success: false, message: "no connection" },
      { status: 503 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "error occurred during the database connection",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 503 },
    );
  }
}
