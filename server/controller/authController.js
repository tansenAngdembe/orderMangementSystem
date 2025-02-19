const Admin = require("../model/Admin");
const jwt = require("jsonwebtoken"); // to generate the token
//using payload, secrect key and hashing algorithm use by jwt 



const generateToken = (user) => {
   return jwt.sign(
      { userid: user._id, userName: user.userName },//payload
      process.env.JWT_SECRECT_KEY,//secrect key
      { expiresIn: "1h" }//token will expire in 1 hour
   );
}

// REGISTER NEW ADMIN
exports.register = async (req, res) => {
   try {
      let { userName, password, email } = req.body;
      let newAdmin = new Admin({ userName, password, email });
      let isAdminexit = await Admin.findOne({ email });
      // console.log(isAdminexit);
      if (isAdminexit) return res.status(400).json({ message: "Admin already exist" });
      let token = generateToken(newAdmin);
      await newAdmin.save();
      res.status(201).json({ msg: "Admin created successfully", token });

   } catch (error) {
      res.status(500).json({ error: error.message })
   }

}


// LOGIN ADMIN
exports.login = async (req, res) => { // WORKING IN LOGIN FUNCTION BUT WORKING PROPERLY
   try {
      const { email, password } = req.body;
      const user = await Admin.findOne({ email }).select("+password");
      console.log(user.password);
      // comparing the password, if user is not found or password is not matched then return the error message
      if (!user || !(await user.comparedPassword(password))) { return res.status(400).json({ msg: "Invalid email or password" }) }
      let token = generateToken(user)
      let u = req.user;
      res.status(200).json({ msg: "Login successfull", token, userVal: u });
   }
   catch (error) {
      res.status(500).json({ msg: "login error", error: error.message })
   }
}



// https://accounts.google.com/o/oauth2/auth?client_id={clientid}&redirect_uri={redirectURI}&scope={scope}&response_type=code 
exports.googleAuth = (req, res) => {
   try {
      const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
      const options = {
         client_id: process.env.CLIENT_ID,
         redirect_uri: process.env.CLIENT_REDIRECT,
         scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.gmail"
         ].join(" "),
         prompt: "consent",
         access_type: "offline",
         response_type: "code",


      }
      const queryString = new URLSearchParams(options)
      res.redirect(`${rootUrl}?${queryString.toString()}`)

   } catch (error) {
      res.status(500).json({ msg: error })

   }
}
