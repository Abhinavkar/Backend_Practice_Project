import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      console.log("Please provide a valid file path");
      return null;
    } else {
      const response = await cloudinary.uploader.upload(localFilePath, {
        resource_type: "auto",
      });
      //file yaha upload hogyi h
      console.log("File uploaded successfully", response.url);
      //   fs.unlinkSync(localFilePath);
      return response;
    }
  } catch (error) {
    fs.unlinkSync(localFilePath);
    console.log("Cloudinary Upload Error: ", error);
    return null;
  }
};

export default uploadOnCloudinary;
// export const uploadImage = async (path) =>{
//     try{
//         const response = await cloudinary.uploader.upload
//         (path, {upload_preset: "dev_setups"});
//         fs.unlinkSync(path);
//         return response;

//     }
//     catch(error){
//         console.log("Cloudinary Upload Error: ", error);
//     }

// }
