import jwt from 'jsonwebtoken'
import { userModel } from "../Models/userModel.js";
import handleError from '../Utils/handleError.js';

export const userAuth = (req, res, next) => {
    const { token } = req.cookies;

    try {
        if (!token) {
            return next(new handleError("Not Authorized. Login again", 400))
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if (decode.id) {
            req.body.userId = decode.id;
        } else {
            return next(new handleError("Not Authorized. Login again", 400))
        }
        next()
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const adminCheck = async (req, res, next) => {
    const { userId } = req.body;
    try {
        const user = await userModel.findById(userId)
        if (user.role !== 'admin') {
            return next(new handleError("Not Authorized. Admin only", 401))
        } else {
            next()
        }

    } catch (error) {
        next(new handleError(error.message, error.statusCode))
    }
}