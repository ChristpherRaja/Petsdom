import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors'
import user from './Routes/userRoutes.js'
import auth from './Routes/authRoutes.js'
import order from './Routes/ordersRoute.js'
import product from './Routes/productRoutes.js'
import cart from './Routes/cartRoutes.js'
import address from './Routes/addressRoutes.js'
import review from './Routes/reviewRoute.js'
import bookVisit from './Routes/bookVisitRoutes.js'
import sellProduct from './Routes/sellProductRoutes.js'
import admin from './Routes/adminRoutes.js'
import {dbConnect} from './Config/dbConnect.js'
import cookieParser from 'cookie-parser';
import path from 'path'
import { fileURLToPath } from 'url';
import error from './Middleware/error.js';

//configure env file
dotenv.config({path:'Backend/.env'})

const app = express();

//json middleware
app.use(express.json())

//cookie parser
app.use(cookieParser())

//cors middleware
app.use(cors({origin:['http://localhost:5173',"http://192.168.140.162:5173"],credentials:true}))

//serve uploads folder
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use('/uploads',express.static(path.join(__dirname,'uploads')))

//db connection
dbConnect()

//using routes
app.use('/auth',auth)
app.use(user)
app.use(product)
app.use(cart)
app.use(address)
app.use(order)
app.use(review)
app.use(bookVisit)
app.use(sellProduct)
app.use(admin)

app.use(error)

const server = app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})

//handle unhandled promise rejections
process.on('unhandledRejection',(err,promise)=>{
    console.log(`Error:${err.message}`)
    console.log("Shutting down the server due to unhandled promise rejection")
    server.close(()=>process.exit(1))
})

//handle uncaught exceptions
process.on('uncaughtException',(err,promise)=>{
    console.log(`Error:${err.message}`)
    console.log("Shutting down the server due to uncaught exception")
    server.close(()=>process.exit(1))
})