import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { 
    createChatController,
    deleteChatController,
    getAllChatsController,
    getChatController,
    updateChatNameController,
} from "../controllers/chat.controller.js";

const chatRouter = express.Router();

chatRouter.post("/create", verifyToken, createChatController);
chatRouter.get("/getAllChats", verifyToken, getAllChatsController);
chatRouter.get("/:chatId", verifyToken, getChatController);
chatRouter.delete("/:chatId", verifyToken, deleteChatController);
chatRouter.put("/:chatId", verifyToken, updateChatNameController);

export default chatRouter;