import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import User from "../models/users.models.js";
import uploadOnCloudinary from "../utils/cloudinaryService.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
const registerUser = asyncHandler(async (req, res) => {
  // res.status(500).json({
  //   message: "okay",
  // });

  const { fullName, email, username, password } = req.body;
  // console.log(fullName);
  if (
    // [fullName,email,username,password].includes(undefined) ||
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All Field are required");
  }
  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser) {
    throw new ApiError(409, "User already exists with that email or username");
  }
  const avatarLocalPath = req.files?.avatar[0]?.path;
  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required");
  }
  const avatarCloudPath = await uploadOnCloudinary(avatarLocalPath);
  const coverImageCloudPath = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatarCloudPath) {
    throw new ApiError(500, "Something went wrong while uploading avatar");
  }

  const user = await User.create({
    fullName,
    email,
    username: username.toLowerCase(),
    password,
    avatar: avatarCloudPath.url,
    coverImage: coverImageCloudPath?.url || "",
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while creating user");
  }
  const token = createdUser.generateAuthToken();
  return res.status(201).json(
    new ApiResponse(201, "User created successfully ", {
      user: createdUser,
      token,
    })
  );
});

export default registerUser;
