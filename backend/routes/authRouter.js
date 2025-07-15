import express from "express";
import { 
    deleteController,
    googleAuthenticationController,
    signinController,
    signoutController,
    signUpController 
} from "../controllers/auth.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const authRouter = express.Router();

authRouter.post("/sign-up", signUpController);
authRouter.post("/sign-in", signinController);
authRouter.post("google", googleAuthenticationController);
authRouter.post("/sign-out", verifyToken, signoutController);
authRouter.delete("/delete", verifyToken, deleteController);


export default authRouter;