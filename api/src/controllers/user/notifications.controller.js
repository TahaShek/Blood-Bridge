import { Notification } from "../../models/notifications.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";


const getAllNotifications = asyncHandler(async (req, res) => {
    const { user } = req;

    const notifications = await Notification.find({ user: user._id }).populate("relatedRequest").populate("relatedUser").lean();

    return res.status(200).json(
        new ApiResponse(
            200,
            { notifications },
            `Notifications fetched successfully - ${user.name}`
        )
    );
});

const getNotificationById = asyncHandler(async (req, res) => {
    const { user } = req;

    const { id } = req.params;

    const notification = await Notification.findById(id).populate("relatedRequest").populate("relatedUser").lean();

    return res.status(200).json(
        new ApiResponse(
            200,
            { notification },
            `Notification fetched successfully - ${user.name}`
        )
    );
});

export { getAllNotifications, getNotificationById };