const Section = require('../models/Section');
const Course = require('../models/Course');
const SubSection = require('../models/SubSection');

exports.createSection = async(req,res) => {
    try{
            // data fetch
        const {sectionName, courseId} = req.body;

        // validation
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        // create section
        const newSection = await Section.create({sectionName});

        console.log("section name",newSection);

        // update the course wih section objectId.
        const updatedCourse = await Course.findByIdAndUpdate(courseId,
            {
                $push:{courseContent:newSection._id} 
            },
            {new:true})
            .populate({
                path:"courseContent",
                populate:{
                    path:"subSection"
                }
            });

        // return res
        return res.status(200).json({
            success:true,
            message:"Section created successfully",
            updatedCourse
        });
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Unable to create section", 
        })
    }
}

// udateSection
exports.updateSection = async(req,res) => {
    try{
        // data fetch
        const {sectionName,sectionId,courseId} = req.body;

        // validate
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        // update the data in section
        const updatedSection = await Section.findByIdAndUpdate(sectionId,
            {
                sectionName
            },{new:true});

        // now get the updated course
        const updatedCourse = await Course.findById(courseId).populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        }).exec();

        // return res
        return res.status(200).json({
            success:true,
            message:"Section updated successfully",
            data:updatedCourse
        });
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Unable to update section", 
        })
    }
}

// delete section
exports.deleteSection = async(req,res) => {
    try{
        // data fetch
        const {sectionId,courseId} = req.body;

        // validate
        if(!sectionId){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        // delete the data in section
        // TODO do we need to delete from courseSchema also ,check while testing.

        const course = await Course.findById(courseId);
        const indexToRemove = course.courseContent.indexOf(sectionId);

        course.courseContent.splice(indexToRemove,1);

        course.save();

        const section = await Section.findById(sectionId);

        // before deleting section we need to delete subsections
        await SubSection.deleteMany({_id:{$in:section.sectionId}});

        // now delete section
        await Section.findByIdAndDelete(sectionId);

        // now return the updated course
        const updatedCourse = await Course.findById(courseId)
        .populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        }).exec();

        // return res
        return res.status(200).json({
            success:true,
            message:"Section deleted successfully",
            data:updatedCourse
        });
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Unable to delete section", 
        })
    }
}