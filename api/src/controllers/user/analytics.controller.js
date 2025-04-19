import { UserAnalytics } from "../../models/userAnalytics.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const getUserAanalytics = asyncHandler(async (req, res) => {
    const {user} =req;

    const record = await UserAnalytics.findOne({ user: user._id });

    if(!record) {
        throw new ApiError(404, "No record found against user");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            { record },
            `Record Fetched Successfully - ${user.name}`
        )
    );
});

export { getUserAanalytics };