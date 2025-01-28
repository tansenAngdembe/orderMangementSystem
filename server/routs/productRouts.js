const express = require("express");
const multer = require("multer");// to handle the file uploads

const {showItems, findItems, insertItems, updateItems,deleteItems} = require("../controller/productController");
const { register,login } = require("../controller/authController");
const { protect } = require("../middleware/authMiddleware");

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
router.post("/admin/register",register);
router.post("/admin/login",login);

//ADMIN PROFILE 
router.get("/admin/profile",protect,(req,res)=>{
   res.status(200).json({msg:"admin profile"});
})

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


module.exports = router;
