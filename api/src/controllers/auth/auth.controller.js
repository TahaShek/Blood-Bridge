import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { User } from "../../models/user.model.js";
import jwt from "jsonwebtoken";
import {
  MaxAgeOfAccessToken,
  MaxAgeOfRefreshToken,
} from "../../constants/constants.js";
import { createUserRecord } from "../../features/user/analytics.feature.js";
import { incrementUserStatsOnSignup } from "../../features/admin/adminAnalytics.feature.js";

const options = {
  httpOnly: true,
  secure: false,
};

const generateAccessAndRefreshToken = async function (userId) {
  try {
    const userInstance = await User.findById(userId);
    const accessToken = await userInstance.generateAccessToken();
    const refreshToken = await userInstance.generateRefreshToken();

    userInstance.refreshToken = refreshToken;

    await userInstance.save({ validateBeforeSave: false }).catch((error) => {
      throw new ApiError(500, error?.message || "Failed to save refresh token");
    });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, error?.message || "Failed to generate tokens");
  }
};

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies?.refreshToken || req.body?.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(400, "no token provided");
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
  } catch (error) {
    throw new ApiError(401, "refresh token expired or invalid");
  }

  const user = await User.findById(decodedToken._id);

  if (!user || user.refreshToken !== incomingRefreshToken) {
    throw new ApiError(401, "token verification failed");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          accessToken,
          refreshToken,
        },
        "tokens refreshed successfully"
      )
    );
});

const signUp = asyncHandler(async (req, res) => {
  const { name, bloodGroup, address, phoneNumber , isDonating } = req.body;

  console.log("body", req.body)

  const doesUserExist = await User.findOne({ phoneNumber });

  if (doesUserExist) {
    throw new ApiError(409, "user with this email already exists");
  }

  const user = await User.create({
    name,
    bloodGroup,
    address,
    phoneNumber,
    isDonating
  });

  const createdUser = await User.findById(user._id).select(
    "-refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "something went wrong while registering user");
  }

  await incrementUserStatsOnSignup(createdUser);

  const userRecord = await createUserRecord(createdUser._id);

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { user: createdUser, record: userRecord },
        "user created successfully"
      )
    );
});

const signIn = asyncHandler(async (req, res) => {
  const { phoneNumber } = req.body;

  const user = await User.findOne({ phoneNumber });

  if (!user) {
    throw new ApiError(404, `no records found against this phoneNumber`);
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const updatedUser = await User.findById(user._id)
    .select("-refreshToken")
    .lean();

  if (!updatedUser) {
    throw new ApiError(500);
  }

  return res
    .status(200)
    .cookie("accessToken", accessToken, {
      ...options,
      maxAge: MaxAgeOfAccessToken,
    })
    .cookie("refreshToken", refreshToken, {
      ...options,
      maxAge: MaxAgeOfRefreshToken,
    })
    .json(
      new ApiResponse(
        200,
        {
          user: updatedUser,
          accessToken,
          refreshToken,
        },
        `User Signed in Successfully - ${updatedUser.name}`
      )
    );
});

const logOut = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req?.user?.id,
    {
      $unset: { refreshToken: 1 },
    },
    { new: true }
  );

  if (!user) {
    throw new ApiError(404, "user not found");
  }

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "user logged out successfully"));
});

const getUserProfile = asyncHandler(async (req, res) => {
  const { user } = req;
  return res
    .status(200)
    .json(
      new ApiResponse(200, { user }, `User Fetched Successfully - ${user.name}`)
    );
});

const setUserDonationStatus = asyncHandler(async (req, res) => {
  const { user } = req;

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    { isDonating: !user.isDonating },
    { new: true }
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user: updatedUser },
        `User Updated Successfully - ${user.name}`
      )
    );
});

const tryMe = async (req, res) => {
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user: "va lo lo tab tab taba di va saktu sak sak saka lee" },
        "ok"
      )
    );
};

export {
  signUp,
  signIn,
  refreshAccessToken,
  logOut,
  getUserProfile,
  setUserDonationStatus,
  tryMe,
};
