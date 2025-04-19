import { AdminAnalytics } from "../../models/adminAnalytics.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";


const getAdminAnalytics = asyncHandler(async (req, res) => {
    const {user} = req;
    if(user.role !== "admin") {
        throw new ApiError(401, "Access Denied, Only admins allowed");
    }

    const record = await AdminAnalytics.findOne({admin: user._id});

    return res.status(200).json(
        new ApiResponse(
            200,
            {record},
            `Analytics Fetched Successfully - ${user.name}`
        )
    );
});

export {getAdminAnalytics};