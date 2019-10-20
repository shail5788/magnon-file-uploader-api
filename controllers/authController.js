const User = require("./../models/users");
const jwt = require("jsonwebtoken");

const getToken=(newUser)=>{
  return jwt.sign({id:newUser._id,name:newUser.name,email:newUser.email},process.env.JWT_SECRET)
}

exports.signUp = async (req, res, next) => {
  
  try {
         var user=req.body;
         if(typeof user.role!="undefined"&& typeof user.role!=undefined && user.role!=""){
            var role="";
             if(user.role){
               role="user";
             }  
         }
          
         const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            isAcitve:(req.body.isAcitve)?req.body.isAcitve:false,
            role:role?role:"user"
           
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
   const error={};
   try{
      const {email,password}=req.body;
       
      if(email=="" || password==""){
         error.status=false;
         error.message="Email address or password is missing ";
         return res.status(400).json(error)
      }
      const user=await User.findOne({email});
     
      const correct=await user.comparePassword(password);
     
      if(!user || !correct){
        error.status=false;
        error.message="Please enter correct email and password";
        return res.status(401).json(error)
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

      return res.status(500).json(error)
   }
  
};
