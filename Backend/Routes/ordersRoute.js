import { getAllOrders, getUserOrder } from '../Controller/orderController.js'
import {adminCheck, userAuth} from '../Middleware/userAuth.js'
import express from 'express'
const router = express.Router()

router.route('/orders').get(userAuth,adminCheck,getAllOrders)
router.route('/order').get(userAuth,getUserOrder)

export default router;