
import mongoose from 'mongoose'
// import dotenv from 'dotenv'
import {DBNAME} from '../constant.js'


// dotenv.config({
//     path:'./env'
// });
 const DBCONNECT=async()=>{
    try{
       const connectionInstance= await mongoose.connect(  `${process.env.DB_URL}/${DBNAME}`)
        console.log(connectionInstance.connection.host)
        console.log(`mongo db connected db host${connectionInstance.connection.host}`)
    }
    catch(error){
        console.log("error",error)
        process.exit(1)

    }
 }
export default DBCONNECT 
// export function DBCONNECT() {
//     // Implementation of database connection logic
//     console.log("Connecting to the database...");


