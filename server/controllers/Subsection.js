const SubSection = require('../models/SubSection');
const Section = require('../models/Section');
const {uploadToCloudinary} = require("../utils/imageUploader");
const Course = require('../models/Course');
require("dotenv").config();

// create subsection
exports.createSubsection = async(req,res) => {
    try{
        // data fetch
        console.log("INSIDE CREATE SUB SEC1....");
        const {sectionId,title,description} = req.body;

        // get image/video from files
        const video = req.files.videoUrl;

        // validation
        if(!title || !description){
            return res.status(400).json({
                success:false,
                message:"Fill all required the fields"
            })
        }

        // upload to cloudinary
        const uploadDetails = await uploadToCloudinary(video,process.env.FOLDER_NAME);

        // create subsection
        const SubSectionDetails = await SubSection.create({
            title:title,
            timeDuration:`${uploadDetails.duration}`,
            description:description,
            videoUrl:uploadDetails.secure_url
        })

        // update object id to section
        const updatedSection = await Section.findByIdAndUpdate({_id:sectionId},
            {$push:{subSection:SubSectionDetails._id}},{new:true}).populate({path:"subSection"}).exec();

        // HW:log updated section here with populate subsection

        // return res
        return res.status(200).json({
            success:true,
            message:"Subsection created successfully",
            data:updatedSection
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Couldn't create subsection"
        })
    }
}

// HW: update and delete subsection
exports.updateSubSection = async(req,res) => {
    try{
        // fetch data
        const {sectionId,subSectionId,title,description} = req.body;

        // const video = req.files.videoFile;

        // validate
        const subSectionDetails = await SubSection.findById(subSectionId);

        console.log("INSIDE EDIT SUB SEC....");
        if(!subSectionDetails){
            return res.status(404).json({
                success:false,
                message:"Subsection does not exist"
            })
        }

        const video = req?.files?.videoUrl;
        // upload to cloudinary if video uploaded
        let uploadVideo = {};
        let timeDuration = 0;
        if(video){
            uploadVideo = await uploadToCloudinary(video,process.env.FOLDER_NAME);
            timeDuration = uploadVideo.duration;
            subSectionDetails.videoUrl = uploadVideo.secure_url;
            subSectionDetails.timeDuration = `${uploadVideo.duration}`
        }

        console.log("INSIDE EDIT SUB SEC2....");
        // update in subsection
        if(title){
            subSectionDetails.title=title;
            console.log(title);
        }
        if(description){
            subSectionDetails.description=description;
            console.log(description);
        }

        await subSectionDetails.save();

        console.log("UPDATED SUBSEC.....",subSectionDetails);
        // now get the updated section
        const updatedSection = await Section.findById(sectionId).populate("subSection")

        // return res
        return res.status(200).json({
            success:true,
            message:"successfully updated subsection",
            data:updatedSection
        });

    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Cannot update subSection"
        })
    }
}

exports.deleteSubSection = async(req,res) => {
    try{
        // fetch subsectionid data
        const {subSectionId,sectionId,courseId} = req.body;

        if(!subSectionId){
            return res.status(404).json({
                success:false,
                message:"subsection not exists"
            })
        }

        // delete subsection from Section
        await Section.findByIdAndUpdate(
            {_id:sectionId},
            {$pull:{
                subSection:subSectionId
            }},
            {new:true}
        )
        await SubSection.findByIdAndDelete(subSectionId);

        // get the updated course
        const updatedCourse = await Course.findById(courseId).populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        }).exec();

        // return res
        return res.status(200).json({
            success:true,
            message:"successfully deleted subsection",
            data:updatedCourse
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"cannot delete subsection"
        })
    }
}