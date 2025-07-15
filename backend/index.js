import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";

import { connectToDB } from "./utils/connectToDB.js";

import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import chatRouter from "./routes/chatRouter.js";
import messageRouter from "./routes/messageRouter.js";

dotenv.config();


const port = process.env.PORT || 3000;

const app = express();

connectToDB();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);
app.use("/api/message", messageRouter);


app.listen(port, () => {
    console.log(`Server listening on: http://localhost:${port}/`);
})


