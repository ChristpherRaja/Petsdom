import { productModel } from "../Models/productModel.js"
import { userModel } from "../Models/userModel.js"
import { orderModel } from "../Models/orderModel.js"
import { bookingVisitModel } from "../Models/bookingVisitModel.js"
import asyncError from "../Middleware/asyncError.js"

export const analytics = asyncError(async (req, res, next) => {
    const products = await productModel.countDocuments()
    const customers = await userModel.countDocuments()
    const orders = await orderModel.countDocuments()
    const visits = await bookingVisitModel.countDocuments()
    const revenue = await orderModel.aggregate([
        {
            $group: {
                _id: null,
                total: { $sum: "$total" }
            }
        }
    ])
    res.status(200).json({ success: true, data: { products, customers, revenue: revenue[0].total,visits,orders } })
})
