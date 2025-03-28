import { reviewModel } from "../Models/reviewModel.js";
import { userModel } from "../Models/userModel.js";
import { productModel } from "../Models/productModel.js";
import asyncError from "../Middleware/asyncError.js";
import handleError from "../Utils/handleError.js";

export const getReviews = asyncError(async (req, res, next) => {
    const reviews = await reviewModel.find().populate('user').populate('product');
    res.status(200).json({ success: true, data: reviews });
});

export const addReview = asyncError(async (req, res, next) => {
    const { userId, productId, review } = req.body;
    const user = await userModel.findById(userId);
    if (!user) {
        return next(new handleError("User not found", 404));
    }
    const product = await productModel.findById(productId);
    if (!product) {
        return next(new handleError("Product not found", 404));
    }
    const addReview = await reviewModel.create({ review, user: userId, product: productId });
    await productModel.updateOne({ _id: productId }, { $set: { reviews: [...product.reviews, addReview._id] } });
    res.status(201).json({ success: true, message: "Review posted Successfully" });
});

export const deleteReview = asyncError(async (req, res, next) => {
    const id = req.params.id;
    const { userId, productId } = req.body;
    const user = await userModel.findById(userId);
    if (!user) {
        return next(new handleError("User not found", 404));
    }
    const review = await reviewModel.findById(id);
    if (review.user != userId) {
        return next(new handleError("Unauthorized request", 403));
    }
    await reviewModel.findByIdAndDelete(id);
    await productModel.updateOne({ _id: productId }, { $pull: { reviews: id } });
    res.status(200).json({ success: true, message: "Review deleted Successfully" });
});
