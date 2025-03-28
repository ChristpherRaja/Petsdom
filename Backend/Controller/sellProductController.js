import { incomingOrderModel } from "../Models/incomingOrders.js";
import { userModel } from "../Models/userModel.js";
import asyncError from "../Middleware/asyncError.js";
import handleError from "../Utils/handleError.js";

export const getSellRequest = asyncError(async (req, res, next) => {
    const sellRequests = await incomingOrderModel.find().populate('user');
    res.status(200).json({ success: true, data: sellRequests });
});

export const getUserSoldProducts = asyncError(async (req,res)=>{
    const {userId} = req.body;
    const user = await userModel.findById(userId);
    if (!user) {
        return next(new handleError("User not found", 404));
    }
    const soldProducts = await incomingOrderModel.find({user:userId})
    res.status(200).json({success:true,data:soldProducts})
})

export const sellProductRequest = asyncError(async (req, res, next) => {
    const { userId, title, description, stock, price } = req.body;
    const user = await userModel.findById(userId);
    if (!user) {
        return next(new handleError("User not found", 404));
    }
    if (!req.file) {
        return next(new handleError("Image needed", 400));
    }
    const sellProduct = await incomingOrderModel.create({
        title,
        description,
        stock,
        image: `/uploads/sellRequest/${req.file.filename}`,
        price,
        user: userId,
        verificationStatus: 'in-process'
    });
    await userModel.updateOne({ _id: userId }, { $set: { productsSold: [...user.productsSold, sellProduct._id] } });
    res.status(201).json({ success: true, message: "Sell request sent successfully" });
});

export const updateStatus = asyncError(async (req, res, next) => {
    const { status, sellRequestId } = req.body;
    const sellRequest = await incomingOrderModel.findById(sellRequestId);
    if (!sellRequest) {
        return next(new handleError("Sell request not found", 404));
    }
    if (status == 'accept') {
        await incomingOrderModel.updateOne({ _id: sellRequestId }, { $set: { verificationStatus: 'bought' } });
        return res.status(200).json({ success: true, message: "Sell request Accepted" });
    }
    if (status == 'decline') {
        await incomingOrderModel.updateOne({ _id: sellRequestId }, { $set: { verificationStatus: 'cancelled' } });
        return res.status(200).json({ success: true, message: "Sell request Declined" });
    }
});
