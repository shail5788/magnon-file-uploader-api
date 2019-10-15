const mongoose = require("mongoose");
const bcrypt   = require("bcryptjs");
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  },
  isActive:{
    type:Boolean,
    default:false
  },
  role:{
    type:String,
    default:"user"
  }
 
 
});

userSchema.pre("save", async function(next){ 
      if(!this.isModified('password')) return next();
      this.password= await bcrypt.hash(this.password,12); 
      next();   
});

userSchema.methods.comparePassword= async function(condidatePassword){
 
   return await bcrypt.compare(condidatePassword,this.password);
}

const User=mongoose.model("User", userSchema);

module.exports  = User;