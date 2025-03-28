import express from 'express'
import { deleteUser, getAllUsers, getSingleUser, removeAvatar, updateUser } from '../Controller/userController.js';
import {adminCheck, userAuth} from '../Middleware/userAuth.js'
import { profileUpload } from '../Config/multerConfig.js';
const router = express.Router()



router.route('/users').get(getAllUsers)
router.route('/user').get(userAuth,getSingleUser).put(profileUpload().single('Image'),userAuth,updateUser)
router.delete("/user/:id",userAuth,adminCheck,deleteUser)
router.delete('/remove-avatar',userAuth,removeAvatar)

export default router;