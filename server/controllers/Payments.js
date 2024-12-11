const {instance} = require("../config/razorpay");
const User = require('../models/User');
const Course = require('../models/Course');
require("dotenv").config();
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail")
const mailSender = require('../utils/mailSender');
const { default: mongoose } = require("mongoose");
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail");
const crypto = require("crypto");
const CourseProgress = require("../models/CourseProgress");


// capture the payment
exports.capturePayment = async(req,res) => {
        console.log("HELLLLOo");
        const {courses} = req.body;
        const userId = req.user.id;

        console.log("COURSES",courses);
        // validations
        if(courses.length === 0){
            return res.json({
                success:false,
                message:"Please visit some courses to buy"
            })
        }

        let totalAmount = 0;
        for(const course_id of courses){
            let course;
            try{
                course = await Course.findById(course_id);
                if(!course){
                    return res.status(400).json({
                        successs:false,
                        message:`course not fount with this id ${course_id}`
                    })
                }

                const uid = new mongoose.Types.ObjectId(userId);
                // check this user is already paid for course or not.
                if(course.studentsEndrolled.includes(uid)){
                    return res.status(409).json({
                        success:false,
                        message:"user already enrolled"
                    })
                }
                totalAmount += course.price;
            }
            catch(err){
                console.log(err);
                return res.status(500).json({
                    success:false,
                    message:err.message,
                })
            }

            const amount = totalAmount;
            const currency = "INR";

            // create options for instance
            const options = {
                amount:amount*100,
                currency:currency,
                receipt:Math.random(Date.now()).toString(),
                // notes:{

                // }
            }

            try{
                const paymentResponse = await instance.orders.create(options);
                res.json({
                    success:true,
                    data:paymentResponse,
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

}

// verify karo payment ko
exports.verifyPayment = async(req,res) => {
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.user.id;

    if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId){
        return res.status(401).json({
            success:false,
            message:"Information missing"
        })
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;
    console.log("ORDER_ID",razorpay_order_id);

    const RAZORPAY_SECRET = 'D6z8gq2K6IPqVmbKlxRBGXvC'
    const expectedSignature = crypto.createHmac("sha256",RAZORPAY_SECRET)
                                    .update(body.toString())
                                    .digest("hex");

    if(expectedSignature === razorpay_signature){
        // student enroll karwao
        await enrollStudent(courses,userId,res);

        return res.status(200).json({
            success:true,
            message:"Student is enrolled"
        })
    }
    return res.status(401).json({
        success:false,
        message:"Payment failed"
    })
    
}


const enrollStudent = async(courses,userId,res) => {
    // add student in studentenrolled for that course and in student add those enrolled courses also.

    if(!courses || !userId){
        return res.status(400).json({
            success:false,
            message:"Plz provide courses and studentId"
        })
    }

    try{
        for(const courseId of courses){
            const enrolledCourse = await Course.findByIdAndUpdate(
                {_id:courseId},
                {
                    $push:{
                        studentsEndrolled:userId
                    }
                },
                {new:true}
            )
            if(!enrolledCourse){
                return res.status(401).json({success:false,message:"Course not found"})
            }

            // create courseprogress for this course for user
            const courseProgress = CourseProgress.create({
                courseID:courseId,
                userId:userId,
                completedVideos:[],
            });

            // (await courseProgress).save
    
            const enrolledStudent = await User.findByIdAndUpdate(
                {_id:userId},
                {
                    $push:{courses:courseId,courseProgress:courseProgress._id}
                },
                {new:true}
            )
            
            // send mail
            const emailResponse = await mailSender(
                enrolledStudent.email,
                `Successfully enrolled into ${enrolledCourse.courseName}`,
                courseEnrollmentEmail(enrolledCourse.courseName,`${enrolledStudent.firstName}`)
            )
            console.log("Email sent successfully",emailResponse);
    
        }
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
    
}

exports.sendPaymentSuccessful = async(req,res) => {
    const {orderId,paymentId,amount} = req.body;

    const userId = req.user.id;

    if(!orderId || !paymentId || !amount || !userId){
        return res.status(401).json({
            success:false,
            message:"Enter all the required fields"
        })
    }

    try{
        // student ko dhundhoo
        const enrolledStudent = await User.findById(userId);

        const emailRes = await mailSender(enrollStudent.email,`Payment recieved`,
        paymentSuccessEmail(`${enrolledStudent.firstName}`,amount/100,orderId,paymentId));
    }
    catch(err){
        console.log("error in sending mail", err)
        return res.status(500).json({success:false, message:"Could not send email"})
    }
}

// // capture the payment and initiate razorpay order
// exports.capturePayment = async(req,res) => {

//         // get courseIId and userId
//         const courseId = req.body;
//         const userId = req.user.id;

//         // validation
//         if(!courseId || !userId){
//             return res.status(401).json({
//                 success:false,
//                 message:"All fields are required"
//             })
//         }

//         // valid courseId
//         // valid courseDetail
//         let course;
//         try{
//             course = await Course.findById(courseId);
//             if(!course){
//                 return res.json({
//                     success:false,
//                     message:"Course detail not found"
//                 })
//             }

//             // has user already paid
//             const uid = new mongoose.Types.ObjectId(userId);
//             if(course.studentsEnrolled.includes(uid)){
//                 return res.json({
//                     success:false,
//                     message:"Already you have purchased this course"
//                 })
//             }
//         }
//         catch(e){
//             console.error(e);
//             return res.status(500).json({
//                 success:false,
//                 message:"Problem in validation"
//             })
//         }

//         // order create
//         const amount = course.price;
//         const currency = "INR";

//         const options = {
//             amount:amount*100,
//             currency:currency,
//             receipt:Math.random(Date.now()).toString(),
//             notes:{
//                 courseId,
//                 userId
//             }
//         };

//         try{
//             const paymentResponse = await instance.orders.create(options);
//             console.log(paymentResponse);

//             // return res
//             return res.status(200).json({
//                 success:true,
//                 courseName:course.courseName,
//                 courseDescription:course.courseDescription,
//                 thumbnail:course.thumbnail,
//                 amount:paymentResponse.amount,
//                 currency:paymentResponse.currency,
//                 orderId:paymentResponse.id
//             })
//         }
//         catch(err){
//             return res.status(500).json({
//                 success:false,
//                 message:"could not initiate order"
//             })
//         }
// }

// // verify signature of razorpay and server
exports.verify = async(req,res) => {
    const webHookSecret = "12345678";
    const signature = req.headers["x-razorpay-signature"];
    
    // three steps to hash that webhooksecret
    const shasum = crypto.createHmac("sha256",webHookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest('hex');

    // now compare both secret
    if(signature === digest){
        console.log("Payment is authorized");

        const {courseId,userId} = req.body.payload.payment.entity.notes;
        
        try{
            // now update course list and student enrolled list
            const enrolledCourse = await Course.findOneAndUpdate(
                {_id:courseId},
                {$push:{studentsEnrolled:userId}},
                {set:true}
            );

            if(!enrolledCourse){
                return res.status(500).json({
                    success:false,
                    message:"Course not found"
                })
            }
            console.log(enrolledCourse);

            const userEnrolled = await User(
                {_id:userId},
                {$push:{courses:courseId}},
                {set:true}
            );
            console.log(userEnrolled);

            // mail send karna hai ab
            const emailResponse = await mailSender(
                userEnrolled.email,
                "Congratulations from CodeHelp",
                "Congratulations, you are onboarded to new course"
            );

            console.log(emailResponse);

            // return res
            return res.status(200).json({
                success:true,
                message:"Successfully purchased"
            })
        }
        catch(err){
            return res.status(500).json({
                success:false,
                message:"Failed in verification"
            })
        }
    }
    else{
        return res.status(400).json({
            success:false,
            message:"Could not buy course"
        })
    }
}