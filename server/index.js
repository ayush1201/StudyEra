const express = require('express');
const mongoose = require('mongoose');
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 4000

const userRoutes = require("./routes/User");
const courseRoutes = require("./routes/Course");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payment");
const contactUsRoute = require("./routes/ContactUsRoute");

const database = require('./config/database');
const cookieParser = require('cookie-parser');
// when frontend gives api to backend then backend should entertain that using cors.
const cors = require('cors');
const {cloudinaryConnect} = require('./config/cloudinary');
const fileUpload = require('express-fileupload');

// databse connect
database.dbConnect();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true,
}))
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp"
}))

// cloudinar connect
cloudinaryConnect();

// route mounting
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/course",courseRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/payment",paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);
// def route
app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"Ur server is running ...."
    })
});

// activate the server
app.listen(PORT, ()=>{
    console.log(`app is running at ${PORT}`)
});