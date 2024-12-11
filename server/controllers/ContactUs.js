const {contactUsEmail} = require("../mail/templates/contactFormRes"); 
const mailSender = require("../utils/mailSender");

exports.contactUsController = async(req,res) => {
    try{
        // get the data from body
        const {email,firstName,lastName,message,phoneNo,countryCode} = req.body;
        const emailRes = await mailSender(
            email,
            "Your Data sent successfully",
            contactUsEmail(email,firstName,lastName,message,phoneNo,countryCode)
        )

        console.log("Email res",emailRes);
        return res.json({
            success:true,
            message:"Email sent successfully"
        })
    }
    catch(error){
        console.log("Error", error)
        console.log("Error message :", error.message)
        return res.json({
        success: false,
        message: "Something went wrong...",
        })
    }
}