import { asyncHandler } from "../../utils/asyncHandler.js"
import { ApiError } from "../../utils/ApiError.js"
import { ApiResponse } from "../../utils/ApiResponse.js"
import { User } from "../../models/user.model.js";

const saveToken = asyncHandler(async (req, res) => {
    const { user } = req;
    const { token } = req.body;
    if (!token) {
        throw new ApiError(400, "Token is required");
    }

    await User.findByIdAndUpdate(user._id, { fcmToken: token });

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Token Saved Successfully"
        )
    );
});

export { saveToken };