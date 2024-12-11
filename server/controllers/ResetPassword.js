const User = require("../models/User");
const mailSender = require('../utils/mailSender');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

// resetPasswordToken
exports.resetPasswordToken = async(req,res) => {
    try{
        // get email from body
        const {email} = req.body;

        // validation of email
        if(!email){
            return res.status(401).json({
                success:false,
                message:"enter the email"
            })
        }
        
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User doesn't exists with this email"
            })
        }

        // generate token
        const token = crypto.randomUUID();

        // update user with token and expiration time ,we need token so that when we are on link page we can get user by that token.
        const updatedDetails = await User.findOneAndUpdate({email:email}, {
            token: token,
            resetPasswordExpires: Date.now() + 5*60*1000
        },{new:true});

        // create url and send mail containing the url
        const url = `http://localhost:3000/update-password/${token}`;
        await mailSender(email,"Password Reset Link",`Password Reset Link: ${url}`);

        // send the response
        return res.json({
            success:true,
            message:"Password change link sent to the mail"
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Some error occurred while resetting the password"
        })
    }
}

// resetPassword
exports.resetPassword = async(req,res) => {
    try{
        // fetch data 
        const {password,confirmPassword,token} = req.body;

        // validate email
        if(password !== confirmPassword){
            return res.status(401).json({
                success:false,
                message:"Password does not match"
            })
        }

        // get userdetails from db using token
        const userDetails = await User.findOne({token: token});

        // if no entry invalid token
        if(!userDetails){
            return res.status(403).json({
                success:false,
                message:"token is invalid"
            })
        }

        // token time check
        if(userDetails.resetPasswordExpires < Date.now()){
            return res.status(401).json({
                success:false,
                message:"token is expired"
            })
        }

        // hash password
        const hashedPass = await bcrypt.hash(password,10);

        // reset the pass
        await User.findOneAndUpdate({token: token},{password: hashedPass},{new:true});

        // return res
        return res.status(200).json({
            success:true,
            message:"Password reset successfully"
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Password reset failure"
        })
    }
}
