const jwt = require("jsonwebtoken");
const Admin = require("../model/Admin")


exports.protect = async (req,res,next)=>{
    try{
        const token = req.headers.authorization?.split(" ")[1];
        if(!token) return res.status().json({msg:"Not authorized"})
        const decode = jwt.verify(token,process.env.JWT_SECRECT_KEY);
        // const userPass = await Admin.findById(decode.userid).select("password")

        res.status(200).json({user:decode})

        next()

    }catch(error){
        res.status(500).json({err:error});
    }
}



