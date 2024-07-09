
import dotenv from 'dotenv'
import express from 'express'

import DBCONNECT from './db/db.js'

dotenv.config(
)
const app=express();
const port=process.env.PORT||3001


DBCONNECT()
.then(()=>{
    app.listen(port,()=>{
        console.log(   `server is running on port http://localhost/${port}`)
    })
    app.on("error",(error)=>{
        console.log("error:",error);
        throw error;
    })
   

})
.catch((err)=>{

console.log("mongo db connetion failed :",err)

})
