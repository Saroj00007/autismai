import { NextRequest, NextResponse } from "next/server";
import { dbconnect } from "@/src/lib/db";
import ConversationModel from "@/src/model/conversationModel";
import { auth } from "@/src/auth";

// GET - Get a single conversation by ID
export async function GET(
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

    await dbconnect();

    const conversation = await ConversationModel.findOne({
      _id: id,
      userId: session.user.id,
    }).lean();

    if (!conversation) {
      return NextResponse.json(
        { success: false, message: "Conversation not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      conversation: {
        id: conversation._id.toString(),
        title: conversation.title,
        messages: conversation.messages,
        createdAt: conversation.createdAt,
        updatedAt: conversation.updatedAt,
      },
    });
  } catch (error) {
    console.error("Error fetching conversation:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch conversation",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

// DELETE - Delete a conversation
export async function DELETE(
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

    await dbconnect();

    const result = await ConversationModel.findOneAndDelete({
      _id: id,
      userId: session.user.id,
    });

    if (!result) {
      return NextResponse.json(
        { success: false, message: "Conversation not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Conversation deleted",
    });
  } catch (error) {
    console.error("Error deleting conversation:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete conversation",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

// PATCH - Update conversation title
export async function PATCH(
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
    const { title } = body;

    if (!title) {
      return NextResponse.json(
        { success: false, message: "Title is required" },
        { status: 400 }
      );
    }

    await dbconnect();

    const conversation = await ConversationModel.findOneAndUpdate(
      { _id: id, userId: session.user.id },
      { title },
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
      conversation: {
        id: conversation._id.toString(),
        title: conversation.title,
      },
    });
  } catch (error) {
    console.error("Error updating conversation:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update conversation",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
