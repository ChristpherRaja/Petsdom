import express from 'express';
import { isAuthenticted, login, logout, register } from '../Controller/authController.js';
import {userAuth} from '../Middleware/userAuth.js'
const router = express.Router();

router.post('/register',register);
router.post('/login',login);
router.post('/logout',userAuth,logout);
router.get('/is-auth',userAuth,isAuthenticted);

export default router;