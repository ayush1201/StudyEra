const cloudinary = require('cloudinary').v2;

exports.uploadToCloudinary = async(file,folder,height,quality) => {
    try{
        const options = {folder};
        if(quality){
            options.quality = quality;
        }
        options.resource_type = 'auto';
        return await cloudinary.uploader.upload(file.tempFilePath,options);
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Couldn't upload to cloudinary"
        })
    }
}