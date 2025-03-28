import express from 'express'
import multer from 'multer'
import path from 'path'
import { getAllProducts, getSingleProduct, updateProduct, deleteProduct, addProduct, productSuggestion } from '../Controller/productController.js';

const router = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Backend/uploads/products')
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    },
})
const upload = multer({ storage: storage })

router.get('/products', getAllProducts);
router.get('/product-suggestion',productSuggestion);
router.route('/product').put(updateProduct).post(upload.single("Image"), addProduct)
router.route('/product/:id').delete(deleteProduct).get(getSingleProduct)

export default router;