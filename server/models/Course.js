const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseName:{
        type:String,
        required:true
    },
    courseDescription:{
        type:String,
        required:true,
        trim:true
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    whatYouWillLearn:{
        type:String,
    },
    courseContent:[
        {
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"Section"
        }
    ],
    ratingAndReviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"RatingAndReviews"
        }
    ],
    price:{
        type:Number
    },
    thumbnail:{
        type:String
    },
    tag:{
        type:[String],
        required:true,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },
    studentsEndrolled:[{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    }],
    instructions:{
        type:[String]
    },
    status:{
        type:String,
        enum:["Draft","Published"]
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
})

module.exports = mongoose.model("Course",courseSchema);