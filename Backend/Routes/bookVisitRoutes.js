import express from 'express';
import {userAuth} from '../Middleware/userAuth.js'
import { bookVisit, getAllVisits } from '../Controller/visitController.js';
const router = express.Router();

router.get('/visits',userAuth,getAllVisits);
router.post('/book-visit',userAuth,bookVisit);

export default router;