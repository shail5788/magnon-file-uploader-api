const fs    =require("fs");
const unzip =require("unzipper");
exports.uploadFile=async (req,res,next)=>{
	
	const files=req.file;
	const path=files.destination+"/"+files.filename;
	await fs.createReadStream(path)
    		.pipe(unzip.Extract({ path:files.destination+"/delivery" }))
	         console.log(req.headers.host);
		 try{
		 	 fs.unlinkSync(path);
		 }catch(err){
		 	console.log(err); 
		 }
	res.status(200).json(files);
         	
}