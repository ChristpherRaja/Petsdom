import { fileURLToPath } from 'url'
import { productModel } from '../Models/productModel.js'
import path from 'path'
import fs from 'fs'
import asyncError from '../Middleware/asyncError.js'
import handleError from '../Utils/handleError.js'
import apiFunctionality from '../Utils/apiFunctionality.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadPath = path.join(__dirname, "..")

export const getAllProducts = asyncError(async (req, res, next) => {
    console.log(req.query);
    const ApiFunctionality = new apiFunctionality(productModel.find(),req.query).search().filter()
    const products = await ApiFunctionality.query;
    res.status(200).json({ success: true, data: products })
})

export const getSingleProduct = asyncError(async (req, res, next) => {
    const productId = req.params.id;
    const product = await productModel.findById(productId).populate({
        path: 'reviews',
        populate: {
            path: 'user'
        }
    }).exec();
    if (!product) {
        return next(new handleError("Product not found", 404))
    }
    res.status(200).json({ success: true, data: product })
})

export const addProduct = asyncError(async (req, res, next) => {
    const { Title, Description, Price, Stock } = req.body;
    if (!Title || !Description || !Price || !Stock) {
        return next(new handleError("More details needed", 400))
    }
    if (!req.file) {
        return next(new handleError("Image needed", 400))
    }
    const add = await productModel.create({ title: Title, description: Description, price: Price, stock: Stock, image: `/uploads/products/${req.file.filename}` })
    res.status(200).json({ success: true, product: add })
})

export const updateProduct = asyncError(async (req, res, next) => {
    const { productId, updatedData } = req.body;
    let product = await productModel.findById(productId);
    if (!product) {
        return next(new handleError("Product not found", 404))
    }
    product = Object.assign(product, updatedData);
    await product.save();
    res.status(200).json({ success: true, product })
})

export const deleteProduct = asyncError(async (req, res, next) => {
    const productId = req.params.id;
    const product = await productModel.findById(productId);
    if (!product) {
        return next(new handleError("Product not found", 404))
    }
    const filePath = path.join(uploadPath, product.image)
    try {
        await fs.promises.unlink(filePath)
    } catch (error) {
        return next(new handleError(error.message, 500))
    }
    await productModel.findByIdAndDelete(productId);
    res.status(200).json({ success: true, product })
})

export const productSuggestion = asyncError(async(req,res,next)=>{
    const {category,productId} = req.query;
    const products = await productModel.find({category,_id:{$ne:productId}}).limit(4);
    const suggestions = products.filter(product=>product._id!==productId);
    res.status(200).json({success:true,data:suggestions})
})