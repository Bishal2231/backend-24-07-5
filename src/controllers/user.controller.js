import { asynchandler } from "../utlis/asynchandler.js";
import { apierror } from "../utlis/apierror.js";
import { User } from "../models/user.model.js";
import {uploadoncloudinary} from "../utlis/cloudinary.js"
import  {apiresponse} from "../utlis/apiresponse.js"

const registerUser=asynchandler(async(req,res)=>{


    const {fullName,email,userName,password}=   req.body

    
    if(fullName===""||email===""||userName==="",password===""){
        throw new apierror(404,"null value canot be sent")
    }

    const existeduser=await User.findOne({
        $or:[{userName},{email}]
    })
    if (existeduser){
        throw new   apierror(409,"user with email or username already exits")
    }

       const avatarlocalpath= req.files?.avatar[0]?.path ;

      //  const coverImagelocalpath=  req.files?.coverImage[0]?.path ;
      // const avatarlocalpath = req.files?.avatar ? req.files.avatar[0].path : null;
      // const coverImagelocalpath= req.files?.coverImage ? req.files.coverImage[0].path : null;

       if(!avatarlocalpath){
        throw new apierror(400,"avtar is not found");
       }
       if(req.files &&Array.isArray(req.files.coverImage)&&req.files.coverImage.length>0)
       {
        var coverImagelocalpath=req.files.coverImage[0].path
       }

       console.log(" response--------------------")

        // console.log(response.data)

        console.log(" req.body --------------------")
        console.log(req.body)
        console.log(" req.files--------------------")

       console.log(req.files)
      const avatar =await uploadoncloudinary(avatarlocalpath);
      const coverImage =await uploadoncloudinary(coverImagelocalpath);

      if(!avatar){
        throw new apierror(400,"avtar is not found after cloudnary upload");
      }



     const user= await User.create({
        fullName,
        avatar:avatar.url,
        coverImage:coverImage.url||" ",
        email,
        password,
        userName,
      })
      const createdUser= User.findById(user._id).select("-password -refreshToken")

      if(!createdUser){
        throw new apierror(500,createdUser,"something went wrong")
      }


      return res.status(200).json(
        new apiresponse(200,"user registered sucessfully")
      )

//       const responseData = {
//         user: {
//             id: createdUser._id,
//             fullName: createdUser.fullName,
//             email: createdUser.email,
//             // Add other necessary fields
//         },
//         message: "User registered successfully"
//     };
// console.log(req.files)
//     // Send the response
//     return res.status(200).json(responseData);
})

export {registerUser}