import asyncError from "../Middleware/asyncError.js";
import { addressModel } from "../Models/addressModel.js";
import { userModel } from "../Models/userModel.js";
import handleError from "../Utils/handleError.js";

export const getAddress = asyncError(async (req, res, next) => {
    const { userId } = req.body;
    const user = await userModel.findById(userId);
    if (!user) {
        return next(new handleError("User not found", 404));
    }
    const address = await addressModel.findById(user.address);
    res.status(200).json({ success: true, data: address });
});

export const addAddress = asyncError(async (req, res, next) => {
    const { userId, DoorNo,City,State,Street,PinCode,Mobile } = req.body;
    const user = await userModel.findById(userId);
    if (!user) {
        return next(new handleError("User not found", 404));
    }
    const addAddress = await addressModel.create({ doorNo:DoorNo,street:Street,city:City,state:State,pincode:PinCode,mobile:Mobile });
    await userModel.updateOne({ _id: userId }, { $set: { address: addAddress._id } });
    res.status(200).json({ success: true, data:addAddress});
});

