import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import User from "../models/user.model.js";
import Chat from "../models/chat.model.js";
import { errorHandler } from "../utils/error.js";
import { responseHandler } from "../utils/response.js";


export const signUpController = async (req, res, next) => {
    console.log("SIGNUP controller: Got request: ", req.body);
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) errorHandler(400, "All fields are required!");

        const existingUser = await User.findOne({ email });
        if (existingUser) errorHandler(409, "User already exists with this email!");

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        const data = await newUser.save();
        console.log('SIGNUP controller: Respond with: ', data);
        responseHandler(res, 201, data, "Account created successfully!")
    } catch (error) {
        next(error);
    }
}

export const signinController = async (req, res, next) => {
    console.log("SIFGIN controller: Got request: ", req.body);
    try {
        const { email, password } = req.body;
        if (!email || !password) errorHandler(400, "All fields are required!");

        const existingUser = await User.findOne({ email });
        if (!existingUser) errorHandler(404, "Invalid credentials (email)"); // FIX: Don't show user what's wrong!

        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) errorHandler(404, "Invalid credentials! (password)"); // FIX: Don't show user what's wrong!

        const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN || "7d"
        });

        res.cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
        });

        const { password: pass, ...rest } = existingUser._doc;

        console.log("SIGN-IN controller: Response: ", rest);
        console.log("SIGN-IN controller: access_token: ", token);

        responseHandler(res, 200, rest, "Signed in successfully!");
    } catch (error) {
        next(error);
    }
}

export const googleAuthenticationController = async (req, res, next) => {
  console.log("GOOGLE-AUTH contoller: Got request: ", req.body);
  try {
    const { name, email, photo } = req.body;
    const user = await User.findOne({ email });

    // sign-in part
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "7d",
      });

      res.cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
      });

      const { password: pass, ...rest } = user._doc;
      responseHandler(res, 200, rest, "Signed in successfully!");
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8); // creating a custom password
      const hashedPassword = await bcrypt.hash(generatedPassword, 10); // hashing customPassword

      const newUser = new User({
        username: name.split(" ").join("").toLowerCase(),
        email,
        password: hashedPassword,
        avatar: photo,
      });
      await newUser.save();

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "7d",
      });

      res.cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
      });

      const { password: pass, ...rest } = newUser._doc;
      responseHandler(res, 200, rest, "User created successfully!");
    }
  } catch (error) {
    next(error);
  }
};

export const signoutController = async (req, res, next) => {
    console.log("SIGNOUT controller: Got request");
    try {
        res.clearCookie("access_token", {
            sameSite: "Strict",
            secure: process.env.NODE_ENV === "production",
        });

        responseHandler(res, 200, null, "Signed out successfully!")
    } catch (error) {
        next(error);
    }
}

export const deleteController = async (req, res, next) => {
    console.log("DELETE controller: Got request: ", req.params.id);
    try {
        const userId = req.params.id;

        if (req.user.id !== userId) errorHandler(403, "You can only delete your own account!");

        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) errorHandler(404, "User not found!");

        await Chat.deleteMany({ user: deletedUser }); // delete all the chats of the user

        res.clearCookie("access_token");
        return responseHandler(res, 200, null, "Account deleted successfully!");
    } catch (error) {
        next(error);
    }
}