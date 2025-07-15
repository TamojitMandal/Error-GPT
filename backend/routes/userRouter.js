import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { updateUserController } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/update/:id", verifyToken, updateUserController);

export default userRouter;