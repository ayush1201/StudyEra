const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        trim:true,
        required:true
    },
    lastName:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        trim:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    accountType:{
        type:String,
        enum : ["Student","Admin","Instructor"],
        reuired:true
    },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Profile"
    },
    token:{
        type:String
    },
    resetPasswordExpires:{
        type:Date
    },
    courses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course"
        }
        
    ],
    image:{
        type:String,
        required:true
    },
    courseProgress:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"courseProgress"
        }
    ]
});

module.exports = mongoose.model("User",userSchema);