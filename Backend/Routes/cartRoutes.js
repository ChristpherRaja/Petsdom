import express from 'express'
import { addCart, checkout, deleteCart, getCart, updateCart} from '../Controller/cartController.js';
import { userAuth } from '../Middleware/userAuth.js';
const router = express.Router()

router.route('/cart').get(userAuth,getCart).put(userAuth,updateCart).post(userAuth,addCart)
router.post('/checkout',userAuth,checkout)
router.delete('/cart/:id',userAuth,deleteCart)

export default router;