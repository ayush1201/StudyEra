const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');
const otpTemplate = require('../mail/templates/emailVerificationTemplate');

const OTPSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:2*60*1000
    }
});

async function sendVerificationMail(email,otp){
    try{
        const mailResponse = await mailSender(email,"Verification email from studyera",otpTemplate(otp));
        console.log("Email sent successfully -> ",mailResponse);
    }
    catch(err){
        console.log("error occured while sending mail",err);
        throw err;
    }
}

OTPSchema.pre("save",async function(next){
    await sendVerificationMail(this.email,this.otp);
    next();
});

module.exports = mongoose.model("OTP",OTPSchema);