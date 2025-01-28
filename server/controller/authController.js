const Admin = require("../model/Admin");
const jwt = require("jsonwebtoken");



const generateToken = (user)=>{
   return jwt.sign(
    {userid: user._id,userName: user.userName},//payload
    process.env.JWT_SECRECT_KEY,//secrect key
    {expiresIn: "1h"}//token will expire in 1 hour
   );
}

// REGISTER NEW ADMIN
exports.register = async (req, res) =>{
   try {
      let {userName, password, email} = req.body;
      let newAdmin = new Admin({userName, password, email});
      let isAdminexit = await Admin.findOne({userName});
      if(isAdminexit) return res.status(400).json({message: "Admin already exist"});
      const saveAdmin = await newAdmin.save();
      res.status(201).json({msg:"Admin created successfully",saveAdmin});


   }catch (error){
      res.status(500).json({error: error.message})
   }

}


// LOGIN ADMIN
exports.login = async (req,res) =>{
   try{
      const {email, password} = req.body; 
      const user = await Admin.findOne({email});
      console.log(user);
      // comparing the password, if user is not found or password is not matched then return the error message
      if(!user || !(await user.comparedPassword(password))){ return res.status(400).json({msg: "Invalid email or password"})};
      let token = generateToken(user);     
      res.status(200).json({msg:"Login successfully", token});      
   }
   catch(error){
      res.status(500).json({msg:"login error", error: error.message})
   }
}