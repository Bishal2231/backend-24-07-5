//for the simple error with out promises 
// const asynchandler =(fn)=async(req,res,next)=>{
//     try{
//         await fn(req,res,next)
//     }
//     catch(error){
//         res.status(error     .code||500).json({sucess:false,message:err.message })

//     }

// }





// for promises error 

const asynchandler=(requesthandler)=>{
   return (req,res,next)=>{
        Promise.resolve(requesthandler(req,res,next)).catch((err)=>{
            next(err)
        })
    }
}



// const asynchandler=(requesthandler)=>{(req,res,next)=>{
//     Promise.resolve(
//         requesthandler(req,res,next)
//     ).catch((err)=>{
//         next(err)
//     })}
// }




export {asynchandler}

