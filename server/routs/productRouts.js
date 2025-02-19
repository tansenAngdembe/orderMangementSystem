const express = require("express");
const multer = require("multer");// to handle the file uploads
const CustomError = require("../utils/CustomError")
const {showItems, findItems, insertItems, updateItems,deleteItems} = require("../controller/productController");
const { register,login,googleAuth } = require("../controller/authController");
const { verifyToken } = require("../middleware/authMiddleware");
const {orders,orderList,updateSatus} = require("../controller/orderController");


  

const router = express.Router();
//  CREATEING THE MIDLEWARE TO HALDLE THE FILE UPLOAD
//  set the loaction to sotre the file // store engine
const storage = multer.diskStorage({
   destination: "./uploads",
   filename: (req, file, cb) => {
      cb(null, file.originalname)
   }
})
const upload = multer({
   storage,
   limits: { fileSize: 1000000 }// 1MB 

})


// GET ALL ITEMS 
router.get("/api/items", showItems)
//GET BY ID
router.get("/api/find/:id", findItems);

//INSERT NEW ITEMS  
router.post("/api/insert", insertItems);

//UPDATE BY ID
router.put("/api/update/:id", updateItems);

//DELETE 
router.delete("/api/delete/:id",deleteItems);



// ADMIN LOGIN AND REGISTER
router.post("/admin/register", register);
router.post("/admin/login",verifyToken,login);

//ADMIN PROFILE 
router.get("/admin/profile",(req,res)=>{

   res.status(200).json({msg:"Welcome to the admin profile"});
})


// Orders endpoint
router.get("/api/orderlist",orderList)
router.post("/api/orders", orders);
router.post("/api/order/:id",updateSatus)





// google oauth 
router.get("/admin/api/o/auth/google",googleAuth)





// testing api for file uploads
router.post("/api", upload.array("images", 4), (req, res) => {
   res.send(req.files)
   let filepath = [] // to store the path of the file
   for (let i = 0; req.files.length > i; i++) {
      filepath.push(req.files[i].path);
   }
   console.log(filepath)
   console.log(req.files.length + "file uploads")
});


//handling the unhandled routes
router.all("*", (req, res,next)=>{
   const error = new CustomError(`Can't find ${req.originalUrl}`, 404)
   next(error);
})


module.exports = router;
