const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const admin = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 20,
        trim: true
    },
    password:{
        type: String,
        reqiured: true,
        minlength : 8,
        select:false
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum:["admin","superadmin"],
        default:"admin"
    },
    isActive:{
        type:Boolean,
        default: true        
    },
    registeredAt:{
        type: Date,
        default: Date.now()
    }

});
// HASH THE PASSWORD BEFORE SAVING IN DB // middleware
admin.pre("save", async function(next){ // pre function or this middleware will not execute in document it will execute while query.
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
})

admin.methods.comparedPassword = async function(userPassword){
   if(!userPassword || !this.password){
    throw new Error("Password is not provided") 
   }
   return await bcrypt.compare(userPassword, this.password)
}

const Admin = mongoose.model("admin",admin);
module.exports = Admin;
