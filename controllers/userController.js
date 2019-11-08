const User =require("../models/users");

exports.getAllUser = async(req, res, next) => {
  const users= await User.find({});
  const total= await User.count();
  res.status(200).json({"data":users});
};
exports.getUser =async(req, res, next) => {
	const userID=req.params.id;
	try{
		const user= await User.findOne({_id:userID});
		res.status(200).json({ 
            response:true,
			user:user,
			error:[],
	    });
	}catch(err){
		res.status(500).json({ 
            response:false,
			user:[],
			error:err,
	    });
	}	
};
exports.createUser = async(req, res, next) => {
	try{

		   const newUser=await User.create({
		   	   name:req.body.name,
			   email:req.body.email,
			   password:req.body.password,
			   role:(req.body.role)?req.body.role:"user",
			   isActive:false
		   })
		     res.status(200).json({
		     	 response:true,
		     	 message:"User has been created successfully",
		     	 user:newUser,
		     	 error:[]
		     })   
	}catch(err){
         res.status(500).json({
         	 response:false,
         	 message:"Internal server error",
         	 user:[],
         	 error:err
         }) 
	}
 

};
exports.editUser = async(req, res, next) => {
  	const userID=req.params.id;
	const newUser=req.body.updateUser;
	try{

			const user= await User.findOne({_id:userID});
		
			user.isActive=newUser.isActive;
			user.role=newUser.role;
			user.email=newUser.email;
			user.name=newUser.name;
			user.password=newUser.password;

			const updatedUser=await user.save();
			const response= {
				 response:true,
				 message:"user Updated successfully",
				 user:updatedUser,
				 error:{}
			}
		    res.status(200).json(response);
	}catch(err){
		const response= {
				 response:false,
				 message:"Internal server Error",
				 user:{},
				 errors:err

			}
			res.status(500).json(response)
	}
};
exports.changeUserPermission=async(req,res,next)=>{

	const userID=req.params.id;
	const newUser=req.body.updateUser;
	try{

			const user= await User.findOne({_id:userID});
		
			user.isActive=newUser.isActive;
			user.role=newUser.role;
			user.email=newUser.email;
			user.name=newUser.name;
			user.password=newUser.password;

			const updatedUser=await user.save();
			const response= {
				 response:true,
				 message:"user Updated successfully",
				 user:updatedUser,
				 error:{}
			}
		    res.status(200).json(response);
	}catch(err){
		const response= {
				 response:false,
				 message:"Internal server Error",
				 user:{},
				 errors:err

			}
			res.status(500).json(response)
	}
	
}
exports.removeUser= async(req,res,next)=>{
      const userID=req.params.id;
      try{
	      	 const response = await User.findOne({_id:userID}).remove();
	      	 const responseBack= {
					 response:true,
					 message:"user deleted successfully",
		     }
		 	 res.status(200).json(responseBack)    	

      }catch(err){
      	 const responseBack= {
					 response:false,
					 message:"Internal server error",
		     }
		 	 res.status(500).json(responseBack)  
      }
     
}

