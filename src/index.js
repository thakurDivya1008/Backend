//require ('dotenv').config({path: 'env'}) // here you are using require statement that will reduce your code consistency. you can do it as :  
import dotenv from "dotenv"

// import mongoose from "mongoose";
// import { DB_NAME  } from "./constants";
import connectDB from "./database/index.js";
dotenv.config({
  path: './env'
})



connectDB();









// import express from "express"
// const app = express();
// ;(async () => {
//   try{
//     await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//     app.on("error", (error) => {
//         console.log("ERRR:", error);
//         throw error
//     })
//     app.listen(process.env.PORT, () => {
//       console.log(`App is listening on port ${process.env.PORT}`);
//     })
//   } catch(error) {
//     console.log("ERROR: ",error)
//     throw err
//   }
// })()