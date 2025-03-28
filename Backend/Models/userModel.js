import mongoose from "mongoose";
import fs from "fs";
import path from "path";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [3, 'Name must be at least 3 characters long'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
    },
    address: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'addresses',
    },
    orders: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'orders',
    }],
    cart: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'carts',
    }],
    avatar: {
        type: String,
        validate: {
            validator: function(v) {
                return !v || /\.(jpg|jpeg|png)$/i.test(v);
            },
            message: 'Please provide a valid file path for the avatar'
        },
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    productsSold: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'incomingOrders',
    }],
    visits: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'bookingVisits',
    }],
}, { timestamps: true });

export const userModel = mongoose.model('users', userSchema);