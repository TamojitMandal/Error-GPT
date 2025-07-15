import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { 
    createMessageHandler,
    deleteMessageHandler,
    updateMessageHandler,
} from "../controllers/message.controller.js";

const messageRouter = express.Router();

messageRouter.post("/:chatId", verifyToken, createMessageHandler);
messageRouter.put("/:chatId", verifyToken, updateMessageHandler);
messageRouter.delete("/:chatId/:messageId", verifyToken, deleteMessageHandler);

export default messageRouter;