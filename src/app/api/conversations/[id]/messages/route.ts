import { NextRequest, NextResponse } from "next/server";
import { dbconnect } from "@/src/lib/db";
import ConversationModel from "@/src/model/conversationModel";
import { auth } from "@/src/auth";

// POST - Add a message to a conversation
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const { role, text, confidence, followUps } = body;

    if (!role || !text) {
      return NextResponse.json(
        { success: false, message: "Role and text are required" },
        { status: 400 }
      );
    }

    await dbconnect();

    const newMessage = {
      role,
      text,
      timestamp: new Date(),
      confidence: confidence ?? undefined,
      followUps: followUps ?? [],
    };

    const conversation = await ConversationModel.findOneAndUpdate(
      { _id: id, userId: session.user.id },
      {
        $push: { messages: newMessage },
        $set: { updatedAt: new Date() },
      },
      { new: true }
    );

    if (!conversation) {
      return NextResponse.json(
        { success: false, message: "Conversation not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Message added",
    });
  } catch (error) {
    console.error("Error adding message:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to add message",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
