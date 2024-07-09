import express from 'express'
import cors from 'cors'
import cookieparser from 'cookie-parser' 
const app= express();

app.use (cors({
   credentials:true

}))
app.use (express.json({limit:"16kb"}))
app.use (express.urlencoded())
app.use (express.static("public"))
app.use(cookieparser())
return {app}

