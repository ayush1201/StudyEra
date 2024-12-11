
const Category = require('../models/category');
function getRandomInt(maxRange){
    return Math.floor(Math.random() * maxRange);
}

exports.categoryCreation = async(req,res) => {
    try{
        // fetch data 
        const {name,description} = req.body;

        // validation
        if(!name || !description){
            return res.status(401).json({
                success:false,
                message:"Enter all the required fields"
            })
        }

        // save in db
        const categoryDetails = await Category.create({
            name:name,
            description:description
        });
        console.log(categoryDetails);

        // return res
        return res.status(200).json({
            success:true,
            message:"Category created successfully"
        })

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Category cannot be created try again"
        })
    }
}

// getAllCategory
exports.showCatgory = async(req,res) => {
    try{
        const getAllCategory = await Category.find({}, {name: true, description: true});

        return res.status(200).json({
            success:true,
            message:"All categories returned successfully",
            getAllCategory
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Error occurred while getAllCategory"
        })
    }

}

// categoryPageDetails

exports.categoryPageDetails = async(req,res) => {
    try{
        // get id from body
        const {categoryId} = req.body;

        // get courses for specified categry id
        const selectedCategory = await Category.findById(categoryId).populate({
            path:"courses",
            match:{status:"Published"},
            populate:"ratingAndReviews"
        }).exec();


        // validation
        if(!selectedCategory){
            return res.status(404).json({
                success:false,
                message:"Data not found"
            })
        }

        
        // get courses for different category
        const categoriesExceptSelected = await Category.find({
            _id:{$ne:categoryId}
        });

        let differentCategory = await Category.findOne(
            categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
              ._id
        )
        .populate({
            path: "courses",
            match: { status: "Published" },
            populate:"ratingAndReviews"
        })
        .exec()


        // get top selling courses 
        const allCategories = await Category.find()
        .populate({
            path:"courses",
            match:{status :"Published"},
            populate:{
                path:"instructor"
            },
            populate:"ratingAndReviews"
        }).exec();


        // get top selling courses
        const allCourses = allCategories.flatMap((course) => course.courses);
        const mostSellingCourses = allCourses
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 10);

        // return res
        return res.status(200).json({
            success:"true",
            data:{
                selectedCategory,
                differentCategory,
                mostSellingCourses
            }
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"cannot get courses",
            error:error.message
        })
    }
}


// hw:index.js,routes,send mail of contact us to user and to support id.