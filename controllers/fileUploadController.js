const path	=require("path");
const fs    =require("fs");
const unzip =require("unzipper");
const nodemailer = require('nodemailer');

exports.uploadFile=async (req,res,next)=>{
	
	const files=req.file;
	const path=files.destination+"/"+files.filename;
	const originalName=files.originalname;
	
    try{
			 await fs.createReadStream(path)
    		.pipe(unzip.Extract({ path:files.destination+"/delivery" }))
	      
			 const status= await this.emailSend(req,originalName);
		 	 fs.unlinkSync(path);
		 	  const filename=originalName.split(".");
	          const actualPath="./uploads/delivery/"+filename[0]+"/index.html";
	          const dirPath="./uploads/delivery/"+filename[0];
	          const html =await this.readHtmlFile(actualPath);
	          const getImg=await this.extractJSON(html,dirPath);
	          const updatedHtml=await this.replaceImages(html,actualPath,getImg,req);
	          
	          //console.log(updatedHtml);
	          res.status(200).json(getImg);
		} catch(err){
		 	console.log(err); 
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
    // const status =await this.emailSend(userInfo);  
    // console.log(userInfo);
}
exports.emailConfiguration=async(userInfo)=>{
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
			  html: await this.emailBody(userInfo)
			};
		  	const mailObj={};
		  	mailObj.transporter=transporter;
		  	mailObj.mailOptions=mailOptions;
		  	return mailObj;

	}catch(err){
		console.log(err);
	}
	
    
}
exports.emailBody=async (userInfo)=>{
  var html=`<table>
  				<tr><th>Email</th><td>${userInfo.email}</td></tr>
                <tr><th>Email</th><td>${userInfo.path}</td></tr>
  		  </table>`;
  return html; 		  

}
exports.emailSend=async(req,filepath)=>{
	try{
		  const emailRecipentDetail=req;	
		  const user    = await this.emailInfo(emailRecipentDetail)

		  user.filepath =filepath;
	   	  const mailObj =await this.emailConfiguration(user);		 		                  	     
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
			     	  	   if(ext=="jpg"||ext=="JPG"||ext=="png" ||ext=="PNG"){
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
	var the_arr = path.split('/');
    var newPath=the_arr[2]+"/"+the_arr[3];
    var result='';
     for(let image of allImage){
     		var expression=image;
     		var re = new RegExp(expression, 'g');
     		var actualPath="http://"+req.headers.host+"/"+newPath+"/"+image
     	    result = html.replace(re, actualPath);
     	    html=result;
     	   
     }
      return new Promise((reject,resolve)=>{
		    	   fs.writeFile(path, result, 'utf8', function (err) {
			        if (err) reject(err);
			        else resolve(html);
			    }); 
    });
         
}