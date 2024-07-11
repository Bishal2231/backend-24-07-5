
import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs'
import dotenv from 'dotenv'

dotenv.config()

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})


const uploadoncloudinary= async (localfilepath)=>{
    try{

        if(!localfilepath){return null}
        else{
            
            const upoloaded=await  cloudinary.uploader.upload(localfilepath,{
                resource_type:"auto"
            })
            fs.unlinkSync(localfilepath)
            // console.log(upoloaded);
            return upoloaded;
        }

    }

  


catch(error){
console.log(error);

fs.unlinkSync(localfilepath)

return null;

}
}
export {uploadoncloudinary}




// cloudinary.config({ 
//     cloud_name: 'dv9noi4np', 
//     api_key: '637978918976489', 
//     api_secret: '<your_api_secret>' // Click 'View Credentials' below to copy your API secret
// });