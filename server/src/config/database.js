import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// * connecting to the mongodb server
const connectMongoDB = async () => {
  try {
    const URL = process.env.MONGODB;
    const connected = await mongoose.connect(URL);
    if (connected) {
      console.log("CONNECTED TO MONGO DB");
      console.log(URL);
    } else {
      console.log("CANNOT CONNECT TO MONGO DB");
    }
  } catch (error) {
    console.error(error);
  }
};

export default connectMongoDB;
