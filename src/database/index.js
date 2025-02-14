import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"

const connectDB = async () => {
    try {
  const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`) // mongoose will return an object whom u can store within a variable.
  console.log(`\n MongoDB connected !! DB HOST : ${connectionInstance.connection.host}`); // Do a console.log of connectionInstance
    }
    catch(error){
        console.log("MongoDB connection error", error);
        process.exit();//read more about it node.js in built function

    }
}
export default connectDB;