const mongoose = require("mongoose");
require("dotenv").config();

exports.dbConnect = async(req,res) => {
    mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log("db connection successful"))
    .catch((err) => {
        console.log("db connection failed");
        console.error(err);
        process.exit(1);    
    })
}
