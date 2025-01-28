const mongoose = require("mongoose");


const uri = process.env.MONGODB_URI;
const connectionDB = async () => {
    try{
        await mongoose.connect(uri);
        console.log("Db connected sucessfully");

    }catch (err){
        console.log("Failed connect mongodb!", err);
        process.exit(1)
    } 
}

module.exports = connectionDB;