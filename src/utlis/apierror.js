// class apierror extends Error{
//     constructor(statuscode,message="something went wrong",error=[],stack=""){
//         super (message)
//         this.statuscode=statuscode
//         this.data=null
//         this.message=message
//         this.success=null
//         this.errors=errors
// //    you can avoid if else
//         if(stack){
//             this.stack=stack
//         }
//         else{
//             Error.captureStackTrace(this,this.constructor)
//         }

//     }

// }
// export {apierror}












class apierror extends Error{

    constructor(statuscode,message,error=[],stack=""){
        super(message)
        this.statuscode=statuscode
        this.message=message
        this.error=error
        this.data=null
        this.sucess=false
        if(stack){
            this.stack=stack

        }
        else{
            Error.captureStackTrace(this,this.constructor)
        }
    }



}
export {apierror}