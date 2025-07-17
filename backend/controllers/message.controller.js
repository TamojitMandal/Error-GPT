import { GoogleGenAI } from "@google/genai";
import Chat from "../models/chat.model.js";
import Message from "../models/message.model.js";
import { errorHandler } from "../utils/error.js";
import { responseHandler } from "../utils/response.js";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || "AIzaSyBz9-jetpfFljRm7gEJR0Kaf8TlRw_QTgk"
});

const getResponse = async (prompt) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      systemInstruction:
        "You are a kind and gentle conversational assistant. You always respond with warmth, empathy, and clarity. Keep your answers simple, concise, and thoughtful. Your goal is to make the user feel understood and supported, no matter the question.",
    },
  });
  return response.text;
};

export const createMessageHandler = async (req, res, next) => {
  console.log("CREATE_MESSAGE controller: Got request: ", req.body);

  try {
    const { prompt } = req.body;
    const { chatId } = req.params;
    const userId = req.user.id;

    if (!prompt || !chatId) errorHandler(400, "Please provide both prompt and chatId");

    const chat = await Chat.findById(chatId);
    console.log("userId-> ", req.user.id);
    console.log("userId from chat-> ", chat.user);
    if (!chat || chat.user.toString() !== req.user.id) errorHandler(403, "Unauthorized or chat not found");

    const message = new Message({
      user: userId,
      chat: chatId,
      prompt,
      reply: "",
    });

    await message.save();

    const reply = await getResponse(prompt);
    message.reply = reply;
    await message.save();

    chat.messages.push({
      _id: message._id,
      prompt,
      reply,
    });

    await chat.save();

    responseHandler(res, 201, message, "Message created with AI reply");

  } catch (error) {
    next(error);
  }
};


export const updateMessageHandler = async (req, res, next) => {
  try {
    const { chatId } = req.params;
    const { messageId, newPrompt } = req.body;
    const userId = req.user._id;

    if (!messageId || !newPrompt) return errorHandler(400, "Missing messageId or prompt");

    const chat = await Chat.findById(chatId);
    if (!chat || chat.user !== userId) {
      return errorHandler(403, "Unauthorized or chat not found");
    }

    const message = await Message.findById(messageId);
    if (!message || message.user !== userId) {
      return errorHandler(403, "Unauthorized or message not found");
    }

    message.prompt = newPrompt;
    message.reply = await getResponse(newPrompt);
    await message.save();

    const updatedMessages = chat.messages.map((msg) =>
      msg._id === messageId
        ? { ...msg.toObject(), prompt: newPrompt, reply: message.reply }
        : msg
    );

    chat.messages = updatedMessages;
    await chat.save();

    responseHandler(res, 200, message, "Message updated successfully");
  } catch (error) {
    next(error);
  }
};


export const deleteMessageHandler = async (req, res, next) => {
  try {
    const { chatId, messageId } = req.params;
    const userId = req.user._id;

    const chat = await Chat.findById(chatId);
    if (!chat || chat.user !== userId) {
      return errorHandler(403, "Unauthorized or chat not found");
    }

    const message = await Message.findById(messageId);
    if (!message || message.user.toString() !== userId) {
      return errorHandler(403, "Unauthorized or message not found");
    }

    await Message.findByIdAndDelete(messageId);

    chat.messages = chat.messages.filter((msg) => msg._id !== messageId);
    await chat.save();

    return responseHandler(res, 200, null, "Message deleted successfully");
  } catch (error) {
    next(error);
  }
};
