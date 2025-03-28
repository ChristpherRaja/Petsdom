import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    product: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'products',
        required: [true, 'Product is required']
    },
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'users',
        required: [true, 'User ID is required']
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: [1, 'Quantity must be at least 1'],
        default: 1
    },
    subtotal: {
        type: Number,
        required: [true, 'Subtotal is required'],
        min: [0, 'Subtotal cannot be negative']
    }
}, { timestamps: true });

export const cartModel = mongoose.model('carts', cartSchema);