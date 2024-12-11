const express = require('express');
const router = express.Router();

const {courseCreate,showAllCourses,getCourseDetails, editCourse, getInstructorCourses, deleteCourse} = require('../controllers/Course');
const {categoryCreation,showCatgory,categoryPageDetails} = require('../controllers/Category');
const {createSection,updateSection,deleteSection} = require('../controllers/Section');
const {createSubsection,updateSubSection,deleteSubSection} = require('../controllers/Subsection');
const {RatingAndReviews,getAvgerageRating,getAllRating} = require('../controllers/RatingAndReview');
const {updateCourseProgress} = require("../controllers/CourseProgress");

const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth");

// course routes
router.post("/courseCreate",auth,isInstructor,courseCreate);
router.post("/updateSection",auth,isInstructor,updateSection);
router.post("/createSection",auth,isInstructor,createSection);
router.post("/createSubsection",auth,isInstructor,createSubsection);
router.post("/updateSubSection",auth,isInstructor,updateSubSection);
router.delete("/deleteSection",auth,isInstructor,deleteSection);
router.post("/deleteSubSection",auth,isInstructor,deleteSubSection);
router.post("/editCourse",auth,isInstructor,editCourse);
router.get("/getInstructorCourses",auth,isInstructor,getInstructorCourses);
router.delete("/deleteCourse",auth,isInstructor,deleteCourse);

router.get("/showAllCourses",showAllCourses);
router.post("/getCourseDetails",getCourseDetails);

// category routes
router.post("/categoryCreation",auth,isAdmin,categoryCreation);
router.post("/categoryPageDetails",categoryPageDetails);
router.get("/showCategory",showCatgory);

// course progress
router.post("/updateCourseProgress",auth,isStudent,updateCourseProgress);

// rating
router.post("/ratingAndReviews",auth,RatingAndReviews);
router.get("/getAverageRating",getAvgerageRating);
router.get("/getAllRating",getAllRating);

module.exports = router;