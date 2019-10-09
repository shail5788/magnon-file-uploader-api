const path	=require("path");
const fs    =require("fs");

const unzip =require("unzipper");
const nodemailer = require('nodemailer');
exports.uploadFile=async (req,res,next)=>{
	
	const files=req.file;
	
	const path=files.destination+"/"+files.filename;
	const originalName=files.originalname;
	console.log(actualPath);
    try{
			 await fs.createReadStream(path)
    		.pipe(unzip.Extract({ path:files.destination+"/delivery" }))
	         console.log(req.headers.host);

		     const status= await this.emailSend(req,path);
		 	 fs.unlinkSync(path);
		 	 res.status(200).json(files);
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