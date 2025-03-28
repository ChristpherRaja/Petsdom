import express from 'express'
import { userAuth,adminCheck } from '../Middleware/userAuth.js';
import { getSellRequest, getUserSoldProducts, sellProductRequest, updateStatus } from '../Controller/sellProductController.js';
import multer from 'multer';
import path from 'path'
const router = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Backend/uploads/sellRequest')
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    },
})
const upload = multer({ storage: storage })


router.route('/sell-product').post(upload.single('Image'),userAuth,sellProductRequest).get(userAuth,adminCheck,getSellRequest).put(userAuth,adminCheck,updateStatus)
router.get('/sold-products',userAuth,getUserSoldProducts)
export default router;