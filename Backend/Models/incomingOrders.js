import mongoose from "mongoose";

const incomingOrderSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        minlength: [3, 'Title must be at least 3 characters long'],
        maxlength: [100, 'Title must be less than 100 characters long']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        minlength: [10, 'Description must be at least 10 characters long'],
        maxlength: [500, 'Description must be less than 500 characters long']
    },
    image: {
        type: String,
        validate: {
            validator: function(v) {
                return /\.(jpg|jpeg|png|gif)$/.test(v);
            },
            message: props => `${props.value} is not a valid image URL!`
        }
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price must be a positive number']
    },
    stock: {
        type: Number, // Changed from String to Number for validation
        required: [true, 'Stock is required'],
        default: 1,
        min: [1, 'Stock must be at least 1']
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'users',
        required: [true, 'User is required']
    },
    verificationStatus: {
        type: String,
        required: [true, 'Verification status is required'],
        enum: ['in-process', 'bought', 'cancelled'],
        default: 'in-process'
    }
}, { timestamps: true });

export const incomingOrderModel = mongoose.model('incomingOrders', incomingOrderSchema);