import express from 'express'
import { addReview, deleteReview, getReviews } from '../Controller/reviewController.js'
import { userAuth,adminCheck } from '../Middleware/userAuth.js';
const router = express.Router()

// router.get('/products',getAllProducts)
router.route('/review').get(userAuth,adminCheck,getReviews).post(userAuth,addReview)
// .put(updateProduct)
router.post('/review/:id',userAuth,deleteReview)

export default router;