const express=require("express");
const app=express();
const router=express.Router();
const uploadController=require("../controllers/fileUploadController");
const multer=require("multer");
const unzip =require("unzipper");
const fs    =require("fs");
const storage=multer.diskStorage({
	destination:function(req,file,cb){
		cb(null,"./uploads/")
	},
	filename:function(req,file,cb){
		cb(null,Math.floor(Math.random() * Math.floor(999999999999999999999))+file.originalname)
	}
})
const upload =multer({storage:storage});

router.post("/",upload.single("filename"),uploadController.uploadFile);

module.exports=router;	  