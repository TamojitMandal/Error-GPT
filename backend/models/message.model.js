import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        requieed: true,
    },
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
        required: true,
    },
    prompt: {
        type: String,
        required: true,
    },
    reply: {
        type: String,
    },
}, { timestamps: true });

const Message = mongoose.model("Message", messageSchema);

export default Message;