import { orderModel } from "../Models/orderModel.js"
import asyncError from "../Middleware/asyncError.js"
import { userModel } from "../Models/userModel.js"
import handleError from "../Utils/handleError.js"

export const getAllOrders = asyncError(async (req, res) => {
    const orders = await orderModel.find().populate({path:"products",populate:"product"}).populate('user').sort({createdAt:-1});
    const newOrders = orders.map(order => {
        return {
            _id: order._id,
            date: order.createdAt.toLocaleDateString(),
            user: order.user.name,
            email: order.user.email,
            items: order.products.length,
            amount: order.total
        }
    });
    res.status(200).json({ success: true, data: newOrders })
})

export const getUserOrder = asyncError(async (req, res, next) => {
    const { userId } = req.body;
    const user = await userModel.findById(userId)
    if (!user) {
        return next(new handleError("User not found", 404))
    }
    const order = await orderModel.find({ user: userId }).populate({path:'products',populate:'product'}).sort({createdAt:-1});
    res.status(200).json({ success: true, data: order })
})

