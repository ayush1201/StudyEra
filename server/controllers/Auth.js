const User = require('../models/User');
const OTP = require('../models/Otp');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const Profile = require('../models/Profile');
const jwt = require('jsonwebtoken');
require("dotenv").config();

// sendfore signup and login to verify
exports.sendOTP = async(req,res) => {
    try{
        const {email} = req.body;

        // check if user exists
        const checkUserPresent = await User.findOne({email});
    
        // if exist karta hoga then return a response
        if(checkUserPresent){
            return res.status(401).json({
                success:false,
                message:"User already registered"
            })
        }

        // otp generate with otp-generator
        var otp = otpGenerator.generate(6,{
            lowerCaseAlphabets:false,
            upperCaseAlphabets:false,
            specialChars:false
        });

        // check if this otp is used
        let result = await OTP.findOne({otp:otp});

        // while result is found in databse of otp 
        while(result){
            otp = otpGenerator.generate(6,{
                lowerCaseAlphabets:false,
                upperCaseAlphabets:false,
                specialChars:false
            });

            result = await OTP.findOne({otp:otp});
        }

        const otpPayload = {email,otp};

        // create database entry
        const otpBody = await OTP.create(otpPayload);
        console.log("otpBody -> ",otpBody);

        // return success response
        return res.status(200).json({
            success:true,
            message:"otp sent successfully",
            otp
        });

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}


// signup page
exports.signup = async(req,res) => {
    try{
        // steps
        // data fetch from req body
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            otp,
            contactNumber,
            accountType,
        } = req.body;

        // validate karlo
        if(!firstName || !lastName || !password || !confirmPassword || !email || !otp){
            return res.status(403).json({
                success:false,
                message:"Fill all the required fields"
            })
        }


        // 2 passwords match karlo
        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Passwords does not match, try again"
            })
        }

        // user exists or not check karlo
        const existingUser = await User.findOne({email});


        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User is already registered"
            })
        }

        // find most recent otp stored for user and sort({createdAt:-1}).limit(1) means sort in desc order based on createdAt attribute and limit means(1) means one entry.
        const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
        console.log("Recent OTP is...",recentOtp);

        // validate otp
        if(recentOtp.length === 0){
            return res.status(400).json({
                success:false,
                message:"OTP not found"
            })
        }
        else if(otp !== recentOtp[0].otp){
            return res.status(400).json({
                success:false,
                message:"Invalid otp"
            })
        }

        

        // hash the password
        const hashedPassword = await bcrypt.hash(password,10);

        // create entry in db and save
        const profile = await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null
        })
        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password:hashedPassword,
            accountType,
            additionalDetails:profile._id,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        })

        // return res
        return res.status(200).json({
            success:true,
            message:"User is registered successfully",
            user,
        });
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"User cannot be registered, please try again",
        });
    }
}


// login page
exports.login = async(req,res) => {
    try{
        // fetch data from req body
        const {email,password} = req.body;

        // validate data
        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"All fields required, please try again"
            })
        };

        // check if user exists or not
        const user = await User.findOne({email}).populate("additionalDetails").exec();

        if(!user){
            return res.status(401).json({
                success:false,
                message:"User not found"
            })
        };

        // now verify the password entered with hashed password already saved in db suited with that email.
        if(await bcrypt.compare(password,user.password)){
            const payload = {
                email:user.email,
                id:user._id,
                role:user.accountType
            }
            const token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"2h"
            })
            user.token = token;
            user.password = undefined;

            // generate jwt and create cookie and send response
            const options  = {
                expires: new Date(Date.now() + 3*24*3600*1000),
                httpOnly:true
            }
            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"logged in successfully...."
            })
        }
        else{
            return res.status(401).json({
                success:false,
                message:"Password do not match"
            })
        }

    }   
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"login failure ,please try again"
        })
    }   
}


// change password 
exports.changePassword = async(req,res) => {
    try{
        // fetch data from body
        const userId = req.user.id;
        const {oldPassword,newPassword} = req.body;
        const user = await User.findById(userId);

        // validate the data
        if(!oldPassword || !newPassword){
            return res.status(401).json({
                success:false,
                message:"Fill all the required fiels"
            })
        }
        else if(!(await bcrypt.compare(oldPassword,user.password))){
            // saved password do not match with entered password
            return res.status(403).json({
                success:false,
                message:"Password for this account does not match"
            })
        }

        // now change the new password in the db
        const newHashedPassword = await bcrypt.hash(newPassword,10);
        await User.findByIdAndUpdate(userId, {$set : {password: newHashedPassword}},{new:true});

        // return res
        return res.status(200).json({
            success:true,
            message:"Password changed successfully"
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Problem occured while changing password"
        });
    }
}