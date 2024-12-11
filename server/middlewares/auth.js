const jwt = require('jsonwebtoken');
const User = require("../models/User");
require("dotenv").config();

// auth
exports.auth = async(req,res,next) => {
    try{
        // extract the token
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ","");


        // if token missing check
        if(!token){
            return res.status(401).json({
                success:false,
                message:"token missing"
            })
        }
        console.log("TOKEN IS......",token);

        // verify the token
        try{
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        }
        catch(err){
            return res.status(401).json({
                success:false,
                message:"token is invalid"
            })
        }
        next();
    }
    catch(err){
        return res.status(401).json({
            success:false,
            message:"something went wrong while verifying the token"
        })
    }
}

// isStudent
exports.isStudent = async(req,res,next) => {
    try{
        if(req.user.role !== "Student"){
            return res.status(401).json({
                success:false,
                message:"This is protected route for students"
            })
        }
        next();
    }
    catch(err){
        return res.status(401).json({
            success:false,
            message:"Cannot verify student accountType"
        })
    }
}


// isInstructor
exports.isInstructor = async(req,res,next) => {
    try{
        if(req.user.role !== "Instructor"){
            return res.status(401).json({
                success:false,
                message:"This is protected route for instructor"
            })
        }
        next();
    }
    catch(err){
        return res.status(401).json({
            success:false,
            message:"Cannot verify instructor accountType"
        })
    }
}

// isAdmin
exports.isAdmin = async(req,res,next) => {
    try{
        console.log("printing account type",req.user.role);
        if(req.user.role !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"This is protected route for admin"
            })
        }
        next();
    }
    catch(err){
        return res.status(401).json({
            success:false,
            message:"Cannot verify admin accountType"
        })
    }
}