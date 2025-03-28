import mongoose from "mongoose";

const bookingVisitSchema = new mongoose.Schema({
    ticketCount:{
        type:Number,
        required:true,
        min: 1,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    },
    total:{
        type:Number,
        required:true,
        min: 0
    },
    user:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'users',
        required: true
    },
    date:{
        type:Date,
        required:true,
        validate: {
            validator: function(v) {
                return v >= new Date();
            },
            message: `Enter valid visit date!`
        }
    },
    status:{
        type:String,
        enum:['booked','cancelled'],
        required: true
    }
},{timestamps:true})

export const bookingVisitModel = mongoose.model('bookingVisits',bookingVisitSchema);
