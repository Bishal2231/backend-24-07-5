import mongoose,{Schema, SchemaTypeOptions} from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import dotenv from 'dotenv'
dotenv.config()


const userSchema= new Schema({

userName:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,
    index:true,

},
email:{
    type:String,
    required:true,
    unique:true,
    lowercase:true
  
  
},
fullName:{
    type:String,
    required:true,

    lowercase:true,
    index:true
},
avatar:{
    type:String,
    required:true,

    lowercase:true
},
coverImage:{
    type:String,
 
 

},
watchhistory:{
    type:Schema.Types.ObjectID,
    ref:"video"
},
password:{
    type:String,
    required:[true,"password is required"]
},
refreshtoken:{
    type:String
}

},{
    timestamps:true
})

userSchema.pre("save", async function (next){
    try{

    if(!this.isModified("password")){ return next()}
    else{
    this.password=await bcrypt.hash(this.password,10)



    next()
    }
} catch(error)
{
    console.log(error)
}
})

// 

// 

userSchema.methods.isPasswordCorrect= async function (password){
  try{
  const comparevalue= await bcrypt.compare(password,this.password)
  return comparevalue;
}catch(error){
    console.log("error on compare");
    throw error;
}
}



userSchema.methods.generateAccessToken= async function (){
    try{
   return await jwt.sign({
    _id:this._id,
    email:this.email,
    userName:this.userName
   },
   ACCESS_TOKEN_SECRET,{
    expiresIn:process.env.ACCESS_TOKEN_EXPIRY
   }
)
    
  }catch(error){
      console.log("error on compare");
      throw error;
  }
  }


  userSchema.methods.generateRefreshToken= async function (){
    try{
   return await jwt.sign({
    _id:this._id,
  
   },
 process.env.REFRSH_TOKEN_SECRET,{
    expiresIn:process.env.REFRESH_TOKEN_EXPIRY
   }
)
    
  }catch(error){
      console.log("error on compare");
      throw error;
  }
  }

export const User=mongoose.model("User",userSchema)



// password: String, required, should be encrypted before saving.
// createdAt: Date, default value should be the current date/time.

// import mongoose ,{Schema} from 'mongoose'
// const userSchema=new Schema({
//     // username: String, required, unique.

//     username:{
//     type:String,
//     required:true,
//     unique:true

//     },email:{
//         // email: String, required, unique, should be a valid email format.

//         type:String,
//         required:true,
//         unique:true,

//     },password:{
//         // password: String, required, should be encrypted before saving.
//         type:String,
//         required:true,

//     }
// },{timestamps:true})
// export const User=("User",userSchema)

