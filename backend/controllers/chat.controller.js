import Chat from "../models/chat.model.js";
import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import { errorHandler } from "../utils/error.js";
import { responseHandler } from "../utils/response.js";

const generateChatName = () => {
    const now = new Date();
    const day = now.getDate();
    const month = now.toLocaleString('default', { month: 'long' });
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;

    return `${day}${month}:${hours}:${minutes}${ampm}`;
};

export const createChatController = async (req, res, next) => {
    console.log("CREATE_CHAT controller: Got request from user: ", req.user.id);

    try {
        let { name } = req.body;
        if (!name) name = generateChatName();

        const user = await User.findById(req.user.id);
        if (!user) errorHandler(404, "User not found!");

        const chat = new Chat({
            user: user,
            name: name,
        });

        const data = await chat.save();
        user.chats.push(data._id); // add new chat to user
        await user.save();

        responseHandler(res, 200, data, "New chat created!");

    } catch (error) {
        next(error);
    }
};

export const getAllChatsController = async (req, res, next) => {
    console.log("GET_ALL_CHATS controller: Got request from user: ", req.user.id);
    try {
        const user = await User.findById(req.user.id);
        if (!user) errorHandler(404, "User not found!");

        const chatIds = user.chats;

        const chats = await Chat.find({ _id: { $in: chatIds } }).select("name"); // only get name

        return responseHandler(res, 200, chats, "Fetched all chats");

    } catch (error) {
        next(error);
    }
};

export const getChatController = async (req, res, next) => {
  console.log("GET_CHAT controller: Got request from user: ", req.user.id);

  try {
    const user = await User.findById(req.user.id);
    if (!user) errorHandler(404, "User not found!");

    const { chatId } = req.params;

    const chat = await Chat.findById(chatId);

    if (!chat) errorHandler(404, "Chat not found!");

    if (chat.user.toString() !== req.user.id) { // check if it belongs to user
        errorHandler(403, "Chat does not belong to you.");
    }

    responseHandler(res, 200, chat, "Chat fetched successfully.");
  } catch (error) {
    next(error);
  }
};

export const deleteChatController = async (req, res, next) => {
  console.log("DELETE_CHAT controller: Got request from user: ", req.user.id);

  try {
    const { chatId } = req.params;

    const user = await User.findById(req.user.id);
    if (!user) errorHandler(404, "User not found!");

    const chat = await Chat.findById(chatId);
    if (!chat) errorHandler(404, "Chat not found!");

    if (chat.user.toString() !== req.user.id) errorHandler(403, "Chat doesn't belong to you.");

    await Chat.findByIdAndDelete(chatId);

    user.chats = user.chats.filter(id => id.toString() !== chatId); // Remove chatId from user
    await user.save();

    await Message.deleteMany({ chat: chatId }); // Delete all the messages of the chat

    responseHandler(res, 200, null, "Chat and its messages deleted successfully.");
  } catch (error) {
    next(error);
  }
};

export const updateChatNameController = async (req, res, next) => {
  console.log("UPDATE_CHAT_NAME controller: Got request from user: ", req.user.id);

  try {
    const { chatId } = req.params;
    const { name } = req.body;

    console.log("userId: ", req.user.id);

    if (!name || name.trim() === "") errorHandler(400, "Chat name is required");
    

    const chat = await Chat.findById(chatId);
    if (!chat) errorHandler(404, "Chat not found");

    if (chat.user.toString() !== req.user.id) errorHandler(403, "Chat does not belong to you!");

    chat.name = name;
    const updatedChat = await chat.save();

    responseHandler(res, 200, updatedChat, "Chat name updated");

  } catch (error) {
    next(error);
  }
};