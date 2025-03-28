import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        minlength: [3, 'Title must be at least 3 characters long'],
        maxlength: [100, 'Title must be less than 100 characters long']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        minlength: [10, 'Description must be at least 10 characters long']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price must be a positive number']
    },
    image: {
        type: String,
        required: [true, 'Image path is required'],
    },
    category:{
        type:String,
        enum:['birds','reptiles','mammals','amphibians','aquatic','invertebrates'],
        required:true
    },
    stock: {
        type: Number,
        required: [true, 'Stock is required'],
        min: [0, 'Stock must be a positive number'],
        default: 1
    },
    reviews: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'reviews'
    }]
}, { timestamps: true });

export const productModel = mongoose.model('products', productSchema);