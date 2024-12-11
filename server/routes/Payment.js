const express = require('express');
const router = express.Router();

const {capturePayment,verifyPayment,sendPaymentSuccessful} = require("../controllers/Payments");
const {auth,isAdmin,isInstructor,isStudent} = require('../middlewares/auth');

router.post("/capturePayment",auth,isStudent,capturePayment);
router.post("/verifyPayment",auth,isStudent,verifyPayment);
router.post("/sendPaymentSuccessful",auth,isStudent,sendPaymentSuccessful);

module.exports = router;