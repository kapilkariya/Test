import mongoose from "mongoose";

const userschema=new mongoose.Schema({
  email:{
    type:String,
    required:true,
    unique:true
  },
  name:{
    type:String,
  },
  password:{
    type:String,
  },
  googleId:{
    type:String,
  },
  avatar:{
    type:String,
  }
})

export default mongoose.model("User",userschema)