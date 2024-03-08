import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import e from "express";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.DB_URI}/${DB_NAME}`
    );
    console.log(
      `\n Connected to database !! DB HOST : ${connectionInstance.connection.host}`
    );
    // console.log(connectionInstance);
  } catch (error) {
    console.log("MONGO DB CONNECTION FAILED", error);
    process.exit(1);
  }
};
export default connectDB;
