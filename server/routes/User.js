const express = require('express');
const router = express.Router();

const {sendOTP,signup,login,changePassword} = require('../controllers/Auth');
const {resetPasswordToken,resetPassword} = require('../controllers/ResetPassword');
const {auth} = require('../middlewares/auth');

// authentication routes
router.post("/login",login);
router.post("/signup",signup);
router.post("/sendOTP",sendOTP);
router.post("/changePassword",auth,changePassword);

// resetpassword routes
router.post("/resetPasswordToken",resetPasswordToken);
router.post("/resetPassword",resetPassword);

module.exports = router;