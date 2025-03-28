import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'users',
        required: [true, 'User ID is required'] // Added validation
    },
    product: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'products',
        required: [true, 'Product ID is required'] // Added validation
    },
    review: {
        type: String,
        required: [true, 'Review text is required'],
        minlength: [10, 'Review must be at least 10 characters long'], // Added validation
        maxlength: [500, 'Review must be less than 500 characters long'] // Added validation
    },
}, { timestamps: true });

export const reviewModel = mongoose.model('reviews', reviewSchema);