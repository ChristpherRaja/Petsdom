import { userModel } from "../Models/userModel.js";
import fs from 'fs';
import path from "path";
import { fileURLToPath } from "url";
import asyncError from "../Middleware/asyncError.js";
import handleError from "../Utils/handleError.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadPath = path.join(__dirname, "..");

export const getAllUsers = asyncError(async (req, res, next) => {
    const users = await userModel.find().populate(['visits', 'productsSold', 'orders']).sort({role:1});
    res.status(200).json({ success: true, data: users });
});

export const getSingleUser = asyncError(async (req, res, next) => {
    const { userId } = req.body;
    const user = await userModel.findById(userId).populate(['visits', 'productsSold', 'orders','address',{path:'orders',populate:{path:'products',populate:"product"}}]);
    if (!user) {
        return next(new handleError("User not found", 404));
    }
    res.status(200).json({ success: true, data: user });
});

export const updateUser = asyncError(async (req, res, next) => {
    const { userId, name, email } = req.body;
    const user = await userModel.findById(userId);
    if (!user) {
        return next(new handleError("User not found", 404));
    }
    if (req.file && user.avatar) {
        const filePath = path.join(uploadPath, user.avatar);
        await fs.promises.unlink(filePath);
    }
    if(name) user.name = name;
    if(name) user.email = email;
    if(req.file) user.avatar = `/uploads/profile/${req.file.filename}`;
    const updateUser = await user.save();
    res.status(200).json({ success: true, updateUser });
});

export const removeAvatar = asyncError(async (req,res)=>{
    const {userId} = req.body;
    const user = await userModel.findById(userId);
    if(!user){
        next(new handleError("User not found",404));
    }
    if (user.avatar) {
        const filePath = path.join(uploadPath, user.avatar);
        await fs.promises.unlink(filePath);
        user.avatar = null;
        await user.save()
    }
    res.status(200).json({success:true,message:"Successfully removed Avatar"})
})

export const deleteUser = asyncError(async (req, res, next) => {
    const { userId } = req.body;
    const id = req.params.id;
    const user = await userModel.findById(id);
    if (!user) {
        return next(new handleError("User not found", 404));
    }
    if (user.avatar) {
        const filePath = path.join(uploadPath, user.avatar);
        await fs.promises.unlink(filePath);
    }
    await userModel.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Deleted successfully" });
});
