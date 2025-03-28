import express from 'express';
import { addAddress, getAddress } from '../Controller/addressController.js';
import { userAuth } from '../Middleware/userAuth.js';
const router = express.Router();

router.route('/address').post(userAuth, addAddress).get(userAuth, getAddress);

export default router;