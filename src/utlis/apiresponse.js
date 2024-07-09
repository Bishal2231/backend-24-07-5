// class apiresponse {
//     constructor(statuscode,data,message="sucess"){
//         this.statusCode=statusCode
//         this.data=data
//         this.message=message
//         this.success=statuscode <400
//     }
// }


class apiresponse{
    constructor(statusCode,message="sucess"){
        // super(message) super is written where we want soemething from the parent element,no parent no super
        this.message=message
        this.statusCode=statusCode
        this.sucess=statusCode< 400

    }
}
export {apiresponse}