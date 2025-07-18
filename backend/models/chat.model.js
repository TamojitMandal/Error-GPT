import mongoose from "mongoose";

const chatSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    messages: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Message",
        },
        prompt: String,
        reply: String,
      }
    ],
    name: {
      type: String,
    },
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
