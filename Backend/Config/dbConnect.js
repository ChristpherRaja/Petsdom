import mongoose from "mongoose";

const dbName = 'Petsdom'

export const dbConnect = () =>{
    mongoose.connect(`${process.env.CONNECTION_STRING}${dbName}`).then(()=>{
        console.log("DB Connected")
    })
}