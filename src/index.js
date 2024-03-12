// require("dotenv").config({path: "./env"});
import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/index.js";
import app from "./app.js";

dotenv.config({
  path: "./env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("error", err);
  });

// approach not to use
// import express from "express";

// const app = express();

// // const connectDb = async ()=>{
// //     try{
// //         await mongoose.connect('mongodb://localhost:27017/apollo', {useNewUrlParser: true});
// //         console.log('Connected to database');
// //     } catch (error) {
// //         console.log('error', error);
// //     }
// // }

// //ifies
// (async () => {
//   try {
//     await mongoose.connect(`${process.env.DB_URI}/${DB_NAME}`, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     app.on("error", (err) => {
//         console.log("Server error:", err);
//         throw(err);
//         });
//         app.listen(process.env.PORT, () => {
//         console.log(`Server is running on port ${process.env.PORT}`);
//         });

//   } catch (error) {
//     console.log("error:", error);
//     throw err;
//   }
// })();
