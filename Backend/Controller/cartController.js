import { cartModel } from '../Models/cartModel.js'
import { productModel } from '../Models/productModel.js';
import { userModel } from '../Models/userModel.js'
import { orderModel } from '../Models/orderModel.js'
import handleError from '../Utils/handleError.js'
import asyncError from '../Middleware/asyncError.js'

export const getCart = asyncError(async (req, res, next) => {
    const { userId } = req.body;
    const user = await userModel.findById(userId);
    if (!user) {
        return next(new handleError("User not found", 404));
    }
    const cart = await cartModel.find({ userId }).populate('product');
    res.status(200).json({ success: true, data: cart });
});

export const addCart = asyncError(async (req, res, next) => {
    const { userId, productId } = req.body;
    const user = await userModel.findById(userId);
    const product = await productModel.findById(productId);
    if (!user) {
        return next(new handleError("User not found", 404));
    }
    if (!product) {
        return next(new handleError("Product not found", 404));
    }
    const addCart = await cartModel.create({ product: productId, userId, quantity: 1, subtotal: product.price });
    const existingCart = user.cart;
    await userModel.updateOne({ _id: userId }, { $set: { cart: [...existingCart, addCart._id] } });
    res.status(201).json({ success: true });
});

export const updateCart = asyncError(async (req, res, next) => {
    const { userId, type, cartId } = req.body;
    const user = await userModel.findById(userId);
    if (!user) {
        return next(new handleError("User not found", 404));
    }
    const cart = await cartModel.findById(cartId).populate('product');
    if (!cart) {
        return next(new handleError("Cart item not found", 404));
    }
    if (type === "increment") {
        const increment = await cartModel.updateOne({ _id: cartId }, { $set: { quantity: cart.quantity + 1, subtotal: cart.subtotal + cart.product.price } }, { new: true });
        res.status(200).json({ success: true, increment });
    } else if (type === "decrement") {
        const decrement = await cartModel.updateOne({ _id: cartId }, { $set: { quantity: cart.quantity - 1, subtotal: cart.subtotal - cart.product.price } }, { new: true });
        res.status(200).json({ success: true, decrement });
    } else {
        return next(new handleError("Invalid type", 400));
    }
});

export const deleteCart = asyncError(async (req, res, next) => {
    const { userId } = req.body;
    const cartId = req.params.id;
    const user = await userModel.findById(userId);
    if (!user) {
        return next(new handleError("User not found", 404));
    }
    await cartModel.findByIdAndDelete(cartId);
    await userModel.updateOne({ _id: userId }, { $pull: { cart: cartId } });
    res.status(200).json({ success: true,  });
});

export const checkout = asyncError(async (req, res, next) => {
    const { userId, total } = req.body;
    if (!total) {
        return next(new handleError("Total is required", 400));
    }
    const user = await userModel.findById(userId);
    if (!user) {
        return next(new handleError("User not found", 404));
    }
    const cart = await cartModel.find({ userId });
    const products = cart.map(item => {
        return { product: item.product, quantity: item.quantity }
    });
    const order = await orderModel.create({ user: userId, deliveryAddress: user.address, products, total });
    await userModel.updateOne({ _id: userId }, { $push: { orders: order._id } });
    user.cart = [];
    await user.save();
    await cartModel.deleteMany({ userId });
    res.status(200).json({ success: true });
});
