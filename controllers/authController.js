const User = require("./../models/users");
const jwt = require("jsonwebtoken");

const getToken=(newUser)=>{
  return jwt.sign({id:newUser._id,name:newUser.name,email:newUser.email},process.env.JWT_SECRET)
}

exports.signUp = async (req, res, next) => {
  
  try {
         const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
           
          });

         const token=getToken(newUser);
      
          res.json({
               statu:"success",
               token:token,
               data:{
                  user:newUser
               }
          });
  } catch (exp) {
    res.json(exp);
  }
};
exports.login =async (req, res, next) => {

   try{
      const {email,password}=req.body;
    
      if(!email || !password){

        return res.json({status:400,message:"Please enter email or password"})
      }
      const user=await User.findOne({email});
     
      const correct=await user.comparePassword(password);
      
      if(!user || !correct){
         return res.json({status:401,message:"Please enter corect email and password"})
      }
      const userInfo={};

      userInfo._id=user._id;
      userInfo.email=user.email;
      userInfo.name=user.name;
      
      const token=getToken(userInfo);
      res.status(200).json({
        response:"success",
        token:token,
        user:{
           user:userInfo
        }
      })
   }catch(exp){

    res.status(500).json({status:false,message:"Unable to log "})
   }
  
};
