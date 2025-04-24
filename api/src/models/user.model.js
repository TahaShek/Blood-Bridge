import mongoose from "mongoose";
import { bloodGroups } from "../constants/constants.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    // email: {
    //     type: String,
    //     trim: true,
    //     index: true,
    //     unique: true,
    //     lowercase: true
    // },
    password: {
      type: String,
      required: [false, "password is required"],
    },
    bloodGroup: {
      type: String,
      enum: bloodGroups,
      required: [true, "Blood group is required"],
    },
    address: {
      street: { type: String, default: "" },
      city: { type: String, default: "" },
      state: { type: String, default: "" },
      country: { type: String, default: "" },
      zipCode: { type: String, default: "" },
    },
    isDonating: {
      type: Boolean,
      default: false,
    },
    phoneNumber: {
      type: String,
      index: true,
      required: [true, "Phone Number is required"],
      unique: [true, "This phone number already exist's"],
    },
    role: {
      type: String,
      default: "user",
    },
    refreshToken: {
      type: String,
      default: "",
    },
    fcmToken: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
userSchema.methods.generateRefreshToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("Users", userSchema);
