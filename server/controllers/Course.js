const Course = require('../models/Course');
const CourseProgress = require('../models/CourseProgress');
const Section = require('../models/Section');
const SubSection = require('../models/SubSection');
const User = require('../models/User');
const Category = require('../models/category');
const {uploadToCloudinary} = require('../utils/imageUploader');
const { convertSecondsToDuration } = require('../utils/secToDuration');

// courseCreater
exports.courseCreate = async(req,res) => {
    console.log("INSIDE BACKEND CREATE COURSE....");
    try{
        
        // fetch data
        const {courseName,courseDescription,whatYouWillLearn,price,status,category,tag} = req.body;

        console.log("INSIDE BACKEND CREATE COURSE2....",tag);
        // get thumbnail
        const thumbnail = req.files.thumbnail;

        // now validation
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !thumbnail){
            return res.status(401).json({
                success:false,
                message:"Enter all required fields"
            })
        }

        // check for instructor
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId,{accountType:"Instructor"});
        console.log("Instructor details :",instructorDetails);
        // verify that userId and instructorDetails._id are same.

        if(!status || status === undefined){
            status = "Draft"
        }
        if(!instructorDetails){
            return res.status(404).json({
                success:false,
                message:"Instructor details not found"
            })
        }

        // check if categoory is valid or not when checking with postman
        const categoryDetails = await Category.findById(category);
        if(!categoryDetails){
            return res.status(404).json({
                success:false,
                message:"Category not found"
            })
        }


        // upload to cludinary
        const thumbNail = await uploadToCloudinary(thumbnail,process.env.FOLDER_NAME);

        // create new course entry
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetails._id,
            whatYouWillLearn:whatYouWillLearn,
            price,
            tag:tag,
            category:categoryDetails._id,
            status:status,
            thumbnail:thumbNail.secure_url,
        })


        // now push the course to the instructor list in user schema
        await User.findByIdAndUpdate(
            {_id:instructorDetails._id},
            {
                $push:{
                    courses: newCourse._id
                }
            },
            {new:true}
        );

        
        // update category schema also just like user
        await Category.findByIdAndUpdate(
            {_id:categoryDetails._id},
            {
                $push:{
                    courses: newCourse._id
                }
            },
            {new:true}
        );


        return res.status(200).json({
            success:true,
            message:"Course created successfully",
            data: newCourse
        })
    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            success:false,
            message:"Course not created"
        });
    }
}

exports.editCourse = async(req,res) => {
    try{

        console.log("INSIDE EDIT COURSE1...");
        // fetch the details
        const {courseId} = req.body;
        const update = req.body;
        
        // get the course which needs to be updated with the above data
        const course = await Course.findById(courseId);

        if(!course){
            return res.status(404).json({error:"COurse not found"});
        }

        console.log("INSIDE EDIT COURSE2...");
        if(req?.files){
            console.log("Thumbail update");
            const thumbnail = req.files.thumbnail;
            // upload to cloudinary
            const thumbnailImage = await uploadToCloudinary(thumbnail,process.env.FOLDER_NAME);
            course.thumbnail = thumbnailImage.secure_url;
        }

        // update only the fields that are present in req body
        for(const key in update){
            if(update.hasOwnProperty(key)){
                if(key === "tag" || key === "instructions"){
                    course[key] = JSON.parse(update[key]);
                }
                else{
                    course[key] = update[key];
                }
                
            }
            
        }

        course.save();

        // get the course 
        const updatedCourse = await Course.findById(courseId).populate({
            path: "instructor",
            populate: {
              path: "additionalDetails",
            },
          })
          .populate("category")
          .populate("ratingAndReviews")
          .populate({
            path: "courseContent",
            populate: {
              path: "subSection",
            },
          })
          .exec()

          return res.status(200).json({
            success:true,
            message:"Course updated successfully",
            data:updatedCourse
          })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({
          success: false,
          message: "Internal server error",
          error: error.message,
        })
      }
}

// get instructor courses
exports.getInstructorCourses = async(req,res) => {
    try{
        // gt the instructor id from user
        const instructorId = req.user.id;

        // get the courses in descending order of created
        const instructorCourses = await Course.find({instructor:instructorId}).sort({createdAt:-1});

        console.log("INSIDE GET COURSES FOR INSTRUCTOR2....",instructorCourses.length);

        return res.status(200).json({
            success:true,
            message:"All courses fetched for this instructor",
            data:instructorCourses
        })
    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            success:false,
            message:"failed to fetch courses",
            error:err.message
        })
    }
}

// getAllCourses
exports.showAllCourses = async(req,res) => {
    try{
        // fetch all the courses
        const AllCourses = await Course.find({},{
            courseName: true,
            price: true,
            thumbnail: true,
            instructor: true,
            ratingAndReviews: true,
            studentsEnroled: true,
        }).populate("instructor").exec();


        return res.status(200).json({
            success:true,
            message:"All courses are available",
            data:AllCourses
        })
    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            success:false,
            message:"can't fetch courses"
        });
    }   
}

// getCourseDetails
exports.getCourseDetails = async(req,res) => {
    try{
        // get course id
        const {courseId} = req.body;
        const userId = req?.user?.id || null;
        
        const courseDetails = await Course.find({_id:courseId})
                                            .populate({
                                                path:"instructor",
                                                populate:{
                                                    path:"additionalDetails"
                                                }
                                            })
                                            .populate("category")
                                            .populate("ratingAndReviews")
                                            .populate("studentsEndrolled")
                                            .populate({
                                                path:"courseContent",
                                                populate:{
                                                    path:"subSection",
                                                    select:"-viideoUrl",
                                                }
                                            })
                                            .exec();

        // validation
        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:`could not find courseDetails with ${courseId}`
            })
        }

        let courseProgressCount = await CourseProgress.findOne({
            courseID: courseId,
            userId: userId,
        })

        console.log("Course details -> ",courseDetails);

        // get time duration and cmpleted course
        let totalDurationInSeconds = 0;
        courseDetails[0]?.courseContent?.map((content) => {
            content.subSection.forEach((subSec) => {
                totalDurationInSeconds += parseInt(subSec.timeDuration);
            })
        })

        const totalDuration = convertSecondsToDuration(totalDurationInSeconds);

        // return res
        return res.status(200).json({
            success:true,
            message:"Successfully fetched the courseDetails",
            data:{
                courseDetails,
                totalDuration,
                completedVideos:courseProgressCount?.completedVideos ? courseProgressCount?.completedVideos : [],
            }
        })
    
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

exports.deleteCourse = async(req,res) => {
    try{
        
        const {courseId} = req.body;

        console.log("COURSE ID ...........",courseId);

        // get course
        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({ message: "Course not found" })
        }

        // uneroll students from this course
        // const studentsEnrolled = course.studentsEnrolled
        // for (const studentId of studentsEnrolled) {
        // await User.findByIdAndUpdate(studentId, {
        //     $pull: { courses: courseId },
        // })
        // }

        console.log("INSIDE1......");
        // dlete sections and subsections
        const courseSections = course.courseContent;
        for(const sectionId of courseSections){
            const section = await Section.findById(sectionId);
            console.log("THE SECTION is.......",section);
            // now get the subsec for this section
            for(const subSectionId of section.subSection){
                await SubSection.findByIdAndDelete(subSectionId);
            }

            // now del section
            await Section.findByIdAndDelete(sectionId);
        } 

        // now del the course
        await Course.findByIdAndDelete(courseId);

        const instructorId = req.user.id;

        // get the courses in descending order of created
        const instructorCourses = await Course.find({instructor:instructorId}).sort({createdAt:-1});

        return res.status(200).json({
            success: true,
            message: "Course deleted successfully",
            data:instructorCourses
        })
    }   
    catch(err){
        console.log(err)
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}


