const Course = require("../models/Course");
const Profile = require("../models/Profile");
const User = require('../models/User');
const { uploadToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();

// already created profile in the user controller ,so only make update function
exports.updateProfile = async(req,res) => {
    try{
        // data fetch from user body
        const {firstName="",lastName="",dateOfBirth="",about="",gender="",contactNumber=""} = req.body;

        // get user id
        const id = req.user.id;

        // validate
        if(!gender || !contactNumber || !id){
            return res.status(400).json({
                success:false,
                message:"Enter all the required fields"
            })
        }

        // get user details and profile details
        const userDetails = await User.findById(id);
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);

        const user = await User.findById(id,{
            firstName:firstName,
            lastName:lastName
        })

        await user.save();

        // update in profile
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.gender = gender;
        profileDetails.about = about;
        profileDetails.contactNumber = contactNumber;
        // the above changes are local to profileDetails so we need to do in database also ,since it is already created so use save method.

        await profileDetails.save();

        // find the updated details
        const updatedUserDetails = await User.findById(id).populate("additionalDetails").exec();

        // return res
        return res.status(200).json({
            success:true,
            message:"Profile updated successfully",
            updatedUserDetails
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Profile not updated try again"
        })
    }
}

// deleteAcount
exports.deleteAccount = async(req,res) => {
    try{
        // get id
        console.log("BEFORE DELETE IN BACKEND");
        const id = req.user.id;
        console.log("BEFORE DELETE IN BACKEND");

        // validate
        const userDetails = await User.findById(id);
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"User does not exist"
            })
        }

        // dlete profile
        await Profile.findByIdAndDelete(userDetails.additionalDetails);

        // HW:TODO: uneroll user from all enrolled courses

        // delete user
        await User.findByIdAndDelete(id);

        // return res
        return res.status(200).json({
            success:true,
            message:"user deleted successfully"
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"User cannot be deleted"
        })
    }
}

exports.updateProfilePicture = async(req,res) => {
    try{

        // get id and photo
        const profileImage = req.files.displayPicture;
        const userId = req.user.id;

        // upload to cloudinary
        const image = await uploadToCloudinary(profileImage,process.env.FOLDER_NAME,1000,1000);

        const updatedProfile = await User.findByIdAndUpdate(
            {_id:userId},
            {image:image.secure_url},
            {new:true}
            )

            res.send({
                success: true,
                message: `Image Updated successfully`,
                data: updatedProfile,
              })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

exports.getAllDetails = async(req,res) => {
    try{
        const id = req.user.id;
        const userDetails = await User.findById(id).populate("additionalDetails").exec();

        return res.status(200).json({
            success:true,
            message:"All the detals of the user",
            userDetails
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Cannot get user details",
        })
    }
}

exports.getEnrolledCourses = async(req,res) => {
    try{
        // get the user id
        const userId = req.user.id;

        // fetch all the courses
        const userDetails = await User.findById(userId)
        .populate({
            path:"courses",
            populate:{
                path:"courseContent",
                populate:"subSection"
            },
        })
        .exec();

        // if user exists or not
        if(!userDetails){
            return res.status(401).json({
                success:false,
                message:"User details not found"
            })
        }

        const courses = userDetails.courses;
        return res.status(200).json({
            success:true,
            data:courses
        });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: err.message,
          })
    }
}

exports.instructorDashboard = async(req,res) => {
    try{
        const userId = req.user.id;
        const courseDetails = await Course.find({instructor:userId});

        const courseData = courseDetails.map((course,ind) => {
            const totalStudentsEnrolled = course.studentsEndrolled.length;
            const totalAmount = totalStudentsEnrolled*(course.price);

            // create new object with additional fields
            const courseDataStats = {
                _id:course._id,
                courseName:course.courseName,
                courseDescription:course.courseDescription,
                totalStudentsEnrolled,
                totalAmount
            }
            return courseDataStats;
        })

        return res.status(200).json({success:true,courses:courseData,message:"Course stats fethced successfully"});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:message.err
        })
    }
}