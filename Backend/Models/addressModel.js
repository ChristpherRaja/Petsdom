import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    doorNo:{
        type:String,
        required:true,
        trim: true,
    },
    street:{
        type:String,
        required:true,
        trim: true,
    },
    city:{
        type:String,
        required:true,
        trim: true,
    },
    state:{
        type:String,
        required:true,
        trim: true,
    },
    pincode:{
        type:String,
        required:true,
        validate: {
            validator: function(v) {
                return /^\d{6}$/.test(v);
            },
            message: props => `${props.value} is not a valid pincode!`
        }
    },
    mobile:{
        type:Number,
        required:true,
        validate: {
            validator: function(v) {
                return /\d{10}/.test(v);
            },
            message: props => `${props.value} is not a valid 10 digit mobile number!`
        }
    }
},{timestamps:true})

export const addressModel = mongoose.model('addresses',addressSchema);