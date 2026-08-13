import { NextRequest, NextResponse } from "next/server";
import { dbconnect } from "@/src/lib/db";
import ConversationModel from "@/src/model/conversationModel";
import { auth } from "@/src/auth";

// GET - List all conversations for the logged-in user
export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    await dbconnect();

    const conversations = await ConversationModel.find({ userId: session.user.id })
      .select("_id title createdAt updatedAt messages")
      .sort({ updatedAt: -1 })
      .lean();

    const formattedConversations = conversations.map((conv) => ({
      id: conv._id.toString(),
      title: conv.title,
      createdAt: conv.createdAt,
      updatedAt: conv.updatedAt,
      messageCount: conv.messages.length,
    }));

    return NextResponse.json({
      success: true,
      conversations: formattedConversations,
    });
  } catch (error) {
    console.error("Error fetching conversations:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch conversations",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

// POST - Create a new conversation
export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, firstMessage } = body;

    await dbconnect();

    const messages = firstMessage
      ? [
          {
            role: "user" as const,
            text: firstMessage,
            timestamp: new Date(),
          },
        ]
      : [];

    const conversation = await ConversationModel.create({
      userId: session.user.id,
      title: title || firstMessage?.slice(0, 50) || "New conversation",
      messages,
    });

    return NextResponse.json({
      success: true,
      conversation: {
        id: conversation._id.toString(),
        title: conversation.title,
        messages: conversation.messages,
        createdAt: conversation.createdAt,
      },
    });
  } catch (error) {
    console.error("Error creating conversation:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create conversation",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
