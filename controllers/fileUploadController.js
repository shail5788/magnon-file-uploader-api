const path	=require("path");
const fs    =require("fs");
const unzip =require("unzipper");
const nodemailer = require('nodemailer');

class PlatformError {
	constructor(code) {
		this.code = code;
		this.errors = [];
		//return this;
	}
	addParamError(msg) {
		this.errors.push({type: 'paramError', msg});
		return this;
	}
	addDbError(msg) {
		this.errors.push({type: 'dbError', msg});
		return this;
	}
	addServerError(msg) {
		this.errors.push({type: 'serverError', msg});
		return this;
	}
}

// console.log(new PlatformError(500).addParamError("Invalid param"));
exports.uploadFile=async (req,res,next)=>{
	const that=this;
    try{
    	const files=req.file;
    	console.log(files);
		// Implement validation
		const pError = new PlatformError(400);
		// if (!files || files === null) {
		// if (!files) {
		// 	pError.addParamError("Invalid file");
		// }
		// if (pError.errors) {
		// 	res.status(pError.code).json(pError);
		// }
		const path=files.destination+"/"+files.filename;
		console.log(path);
		const originalName=files.originalname;
		const stream= fs.createReadStream(path);
		stream.pipe(unzip.Extract({ path:files.destination+"/delivery" }))
			.on('close',async function(){
			console.log("first debug")
				 // const status= await this.emailSend(req,originalName);
				 
			 	 fs.unlinkSync(path);
			 	  console.log("shailendra");
			 	  const filename=originalName.split(".");
			 	  console.log(filename);


		          const actualPath="./uploads/delivery/"+filename[0]+"/index.html";
		          if(fs.existsSync(actualPath)){
		          	console.log("file exist")
		          }else{
		          	console.log("file not exist")
		          }
		          const dirPath="./uploads/delivery/"+filename[0];
		          const html =await that.readHtmlFile(actualPath);
		          const getImg=await that.extractJSON(html,dirPath);
		          const dirpathForFile="delivery/"+filename[0]+"/index.html";
		          console.log("dirpath");
		          const updatedHtml=await that.replaceImages(html,actualPath,getImg,req);
		           // console.log(updatedHtml);
		          const previewUrl="http://"+req.headers.host+"/"+dirpathForFile;
		          const status= await that.emailSend(req,originalName,previewUrl,updatedHtml);
		          res.status(200).json(getImg);  	
		})

      	
		} catch(err){
		 	console.log(err); 
		 	res.status(500).json(new PlatformError(500).addParamError("Error on code"));
		}
	//
         	
};

exports.emailInfo=async(req)=>{
    const userInfo={};
    userInfo.email=req.body.email;
    userInfo.subject=req.body.subject;
    userInfo.quality=req.body.quality;
    userInfo.litmus=req.body.litmus;
   
    if(userInfo.quality=="true" && userInfo.litmus=="true"){
      userInfo.qualityEmail="magnonqa@gmail.com";
      userInfo.litmusEmail="shail5788@gmail.com"
    }else if(userInfo.quality=="true"){
      userInfo.qualityEmail="magnonqa@gmail.com";
    }else if(userInfo.litmus=="true"){
      userInfo.litmusEmail="shail5788@gmail.com"
    }
    return userInfo;
    
}
exports.emailConfiguration=async(userInfo,emailContent)=>{
	try {
         
			const transporter = nodemailer.createTransport({
			 	 service: 'gmail',
			  	
			  	auth: {
			    	user: process.env.AUTH_USERNAME,
			    	pass: process.env.AUTH_PASS
			  	}
			});
			var mailTo=userInfo.email;
			if(typeof userInfo.qualityEmail!="undefined" && typeof userInfo.qualityEmail!=undefined && userInfo.qualityEmail!=''){
           		 mailTo+=","+userInfo.qualityEmail;
			}
			if(typeof userInfo.litmusEmail!=undefined && typeof userInfo.litmusEmail!="undefined" && userInfo.litmusEmail!=''){
				mailTo+=","+userInfo.litmusEmail;	
			}
			
			const mailOptions = {
			  from: 'shailendra.verma@magnon-egplus.com',
			  to: mailTo,
			  subject: userInfo.subject,
			  html: await this.emailBody(userInfo,emailContent)
			};
		  	const mailObj={};
		  	mailObj.transporter=transporter;
		  	mailObj.mailOptions=mailOptions;
		  	return mailObj;

	}catch(err){
		console.log(err);
	}
	
    
}
exports.emailBody=async (userInfo,emailContent)=>{
	
  var html=`<table>
  				<tr><th>Email</th><td>${userInfo.email}</td></tr>
                <tr><th>Email</th><td>${userInfo.filepath}</td></tr>
  		  </table>`;
     html+=emailContent;
  return html; 		  

}
exports.emailSend=async(req,filepath,previewUrl,emailContent)=>{
	try{
		  const emailRecipentDetail=req;	
		  const user    = await this.emailInfo(emailRecipentDetail)

		  user.filepath =previewUrl;
		  console.log("shailendra get user info")
		  console.log(user);
	   	  const mailObj =await this.emailConfiguration(user,emailContent);		 		                  	     
	      const status  =await mailObj.transporter.sendMail(mailObj.mailOptions);
		  console.log(status);

	}catch(err){
     	  console.log(err);
    }
   
}
exports.readHtmlFile=(path)=>{

	return new Promise((resolve, reject) => {
	    fs.readFile(path, "utf8", (err, data) => {
	      	   if (err) reject(err);
		       else resolve(data);
		});
	}); 
}

exports.extractJSON=async(html,path)=>{
	const files=await this.getAllImage(html,path);
	return files;
}
exports.getAllImage=(html, path)=>{

     const farray=[];
    
     return new Promise((resolve,reject)=>{
     	  fs.readdir(path,(err,files)=>{
	     	  	if(err){
	     	  		reject(err);
	     	  	}else{
	     	  		  for (let file of files){
			 	  		   const ext=file.split(".")[1];
			     	  	   if(ext=="jpg"||ext=="JPG"||ext=="png" ||ext=="PNG" ||ext=="gif" || ext=="GIF"){
			                  farray.push(file);
			     	  	   }
						}
			 	  	resolve(farray);
		     	 }
     	   })
     })
    

}
/********************************************************
* this function replace all image path with given path  *
* it will take four param								*					 *
*********************************************************/

exports.replaceImages=(html,path,allImage,req)=>{
	console.log('replaceImages====================');
   

	var the_arr = path.split('/');
    var newPath=the_arr[2]+"/"+the_arr[3];
   
    var result='';
     for(let image of allImage){
     		var expression=image;
     		var re = new RegExp(expression, 'g');
     		
     		var actualPath="http://"+req.headers.host+"/"+newPath+"/"+image
     	    console.log(actualPath);
     	    result = html.replace(re, actualPath);
     	   // console.log(result);
     	    html=result;
     	   
     }

     console.log('replaceImages=================2');
      return new Promise((resolve, reject)=>{
		    	   fs.writeFile(path, html, 'utf8', function (err) {
			        if (err) {
			        	console.log('replaceImages=================3');
			        	return reject(err);
			        }
			        console.log('replaceImages=================4');
			        return resolve(html);
			    }); 
    });
         
}