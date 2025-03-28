import jwt from "jsonwebtoken";
import { userModel } from "../Models/userModel.js"
import bcrypt from 'bcrypt'
import asyncError from '../Middleware/asyncError.js'

export const register = asyncError(async (req, res, next) => {
    const { Name, Email, Password } = req.body;
    if (!Name || !Email | !Password) {
        return next(new Error("Please fill all the fields", 400))
    }
    const user = await userModel.findOne({ email: Email });
    if (user) {
        return next(new Error("User already exists with this email", 400))
    }
    const hashedPassword = await bcrypt.hash(Password, 10);
    const newUser = await userModel.create({ name: Name, email: Email, password: hashedPassword });
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.cookie('token', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });

    res.status(200).json({ success: true, message: "User Registered Successfully" });
})

export const login = asyncError(async (req, res, next) => {
    const { Email, Password } = req.body;
    const user = await userModel.findOne({ email: Email });
    if (!user) {
        return next(new Error("User does not exist with this email", 400))
    }
    const userCheck = await bcrypt.compare(Password, user.password);
    if (!userCheck) {
        return next(new Error("Invalid Credentials", 400))
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.cookie('token', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 })
    res.status(200).json({ success: true, message: "User Logged in Successfully" })
})

export const logout = asyncError(async (req, res, next) => {
    res.clearCookie('token', { httpOnly: true });
    res.status(200).json({ success: true, message: "Logged out" });
});

export const isAuthenticted = asyncError(async (req, res, next) => {
    res.json({ success: true });
});
