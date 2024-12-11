const RatingAndReviews = require("../models/RatingAndReviews");
const Course = require('../models/Course');
const { default: mongoose } = require("mongoose");

// create rating
exports.RatingAndReviews = async(req,res) => {
    try{
        // get userid
        const userId = req?.user?.id || null;

        // fetch the data from body
        const {rating,review,courseId} = req.body;

        // check if user has enrolled in that course
        const uid = new mongoose.Types.ObjectId(userId);

        const courseEnrolled = await Course.findById(courseId);

        if(!courseEnrolled?.studentsEndrolled.includes(uid)){
            return res.status(404).json({
                success:false,
                message:'Student is not enrolled in the course',
            });
        }

        const alreadyReviewed = await RatingAndReviews.find({
            user:userId,
            course:courseId
        })

        if(alreadyReviewed.length !== 0) {
            return res.status(403).json({
                success:false,
                message:'Course is already reviewed by the user',
            });
        }

        // now create rating and review
        const Rating = await RatingAndReviews.create({
            rating:rating,reviews:review,user:userId,course:courseId
        });

        // now update in course also
        const updatedCourseDetails = await Course.findByIdAndUpdate(courseId,
                {
                    $push:{
                        ratingAndReviews:Rating._id
                    }
                },
                {new:true}
            );
        
        console.log(updatedCourseDetails);

        // return res
        return res.status(200).json({
            success:true,
            message:"This user has successfully rated the course"
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Could not be rated"
        })
    }
}


// getAverageRating

exports.getAvgerageRating = async(req,res) => {
    try{
        // get course id
        console.log("INSIDE GET AVG,,,,,,");
        const {courseId} = req.body;

        console.log("INSIDE GET AVG,,,,,,",courseId);

        // calculate the avg rating
        const result = await RatingAndReviews.aggregate([
            {
                $match:{
                    course:new mongoose.Types.ObjectId(coursId)
                }
            },
            {
                $group:{
                    _id:null,
                    averageRating:{$avg:"rating"},
                }
            }
        ])

        // return rating
        if(result.length > 0){
            return res.status(200).json({
                success:true,
                averageRating:result[0].averageRating
            })
        }

        // if no rating exists
        return res.status(200).json({
            success:true,
            message:"Average rating is zero till now",
            averageRating:0
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

// getAllRating

exports.getAllRating = async(req,res) => {
    try{
        // select is the new method in which we can select what fields we want to populate.
        const allReviews = await RatingAndReviews.find({})
                                    .sort({rating:"desc"})
                                    .populate({
                                        path:"user",
                                        select:"firstName lastName email image"
                                    })
                                    .populate({
                                        path:"course",
                                        select:"courseName",
                                    })
                                    .exec();

        // return res
        return res.status(200).json({
            success:true,
            message:"All reviews are fetched successfully",
            data:allReviews
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}