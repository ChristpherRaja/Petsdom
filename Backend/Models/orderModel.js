import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    total: {
        type: Number,
        required: [true, 'Total amount is required'],
        min: [0, 'Total amount cannot be negative'],
    },
    deliveryAddress: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'addresses',
        required: [true, 'Delivery address is required'],
    },
    products: [{product:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'products',
        required: [true, 'Product is required'],
    },quantity:{
        type:Number,
        required:true
    }}],
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'users',
        required: [true, 'User is required'] // Added validation for required user
    },
}, { timestamps: true });

export const orderModel = mongoose.model('orders', orderSchema);