import mongoose from 'mongoose'

const userSchema=new Schema({
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
    fullname:{
        type:String,
        required:true,
    
        lowercase:true,
        index:true
    },
    avater:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    coverimage:{
        type:String,
     
        unique:true,
    
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
        type:string
    }
    
},{
timestamps:true
});


userSchema.pre("password",async function (next){

    if(!this.isModified("password")) { next()}

    this.password= await bcrypt.hash(this.password,10)
    next()


})

userSchema.models.isPasswordCorrect=function (){
    try{
   const passanswer= bcrypt.compare(password,this.password)
   return passanswer
}
catch(error){
    throw error
}
}

userSchema.models.generateAccessToken= async function (){
    return await jwt.sign({    
        _id:this._id,
        email:this.email

    },
    process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    })


}





export const User=("user",userSchema)