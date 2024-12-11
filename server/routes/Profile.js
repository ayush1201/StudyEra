const express = require('express');
const router = express.Router();

const {updateProfile,deleteAccount,getAllDetails, updateProfilePicture, getEnrolledCourses,instructorDashboard} = require('../controllers/Profile');
const { auth } = require('../middlewares/auth');

router.delete("/deleteAccount",auth,deleteAccount);
router.put("/updateProfile",auth,updateProfile);
router.get("/getAllDetails",auth,getAllDetails);
router.put("/updateProfilePicture",auth,updateProfilePicture);
router.get("/getEnrolledCourses",auth,getEnrolledCourses);
router.get("/instructorDashboard",auth,instructorDashboard);

module.exports = router;