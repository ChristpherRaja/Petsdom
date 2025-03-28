import express from 'express';
import { adminCheck, userAuth } from '../Middleware/userAuth.js';
import { analytics } from '../Controller/adminController.js';

const router = express.Router();

router.get('/analytics',userAuth,adminCheck,analytics);

export default router