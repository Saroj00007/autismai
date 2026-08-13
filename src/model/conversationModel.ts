import mongoose, { Document, Schema, Model } from "mongoose";

interface IMessage {
  role: "user" | "bot";
  text: string;
  timestamp: Date;
  confidence?: number;
  followUps?: string[];
}

interface IConversation extends Document {
  userId: string;
  title: string;
  messages: IMessage[];
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    role: {
      type: String,
      required: true,
      enum: ["user", "bot"],
    },
    text: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      required: true,
      default: Date.now,
    },
    confidence: {
      type: Number,
      required: false,
    },
    followUps: {
      type: [String],
      required: false,
      default: [],
    },
  },
  { _id: false }
);

const ConversationSchema = new Schema<IConversation>(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      default: "New conversation",
    },
    messages: {
      type: [MessageSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Create index for sorting by updatedAt
ConversationSchema.index({ userId: 1, updatedAt: -1 });

const ConversationModel: Model<IConversation> =
  mongoose.models.Conversation ||
  mongoose.model<IConversation>("Conversation", ConversationSchema);

export default ConversationModel;
export type { IConversation, IMessage };
