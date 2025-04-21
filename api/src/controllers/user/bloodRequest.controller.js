
import mongoose from "mongoose";
import { BloodRequest } from "../../models/bloodRequest.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { incrementRequestStats } from "../../features/user/analytics.feature.js";
import { incrementTotalBloodRequestsStats } from "../../features/admin/adminAnalytics.feature.js";
import { sendBloodRequestNotification } from "../../features/notifications/fcm.feature.js";
import { filters } from "../../constants/constants.js";

const createBloodRequest = asyncHandler(async (req, res) => {
    const { user } = req;

    const bloodRequest = await BloodRequest.create({
        requestor: user._id,
        ...req.body
    });

    if (!bloodRequest) {
        throw new ApiError(500, "Something went wrong while creating request");
    }

    const response = await sendBloodRequestNotification({ ...req.body, requesterName: user.name })

    if(response?.status !== 200) {
        throw new ApiError(response.status, response.message);
    }
    
    await incrementRequestStats(user._id);
    
    await incrementTotalBloodRequestsStats();

    return res.status(201).json(
        new ApiResponse(
            201,
            { bloodRequest },
            "Request Created Successfully"
        )
    );
});

const getAllUserBloodRequests = asyncHandler(async (req, res) => {
    const {user} = req;
    
    const query = { requestor: user._id };

    filters.forEach((key) => {
        if(req.query[key]) {
            if(key === "hospital") {
                query[key] = { $regex: req.query[key], $options: "i" };
            } else {
                query[key] = req.query[key];
            }
        }
    })

    const bloodRequests = await BloodRequest.find(query);

    if(bloodRequests.length === 0) {
        throw new ApiError(404, "No requests found against user");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            { bloodRequests },
            `Requests Fetched Successfully -${user.name}`
        )
    )
});

const getUserBloodRequest = asyncHandler(async (req, res) => {
    const {user} = req;

    const {id} = req.params;

    if(!mongoose.isValidObjectId(id)) {
        throw new ApiError(400, "Invalid request id");
    }

    const bloodRequest = await BloodRequest.findOne({_id: id, requestor: user._id});

    if(!bloodRequest) {
        throw new ApiError(404, `No request found against id: ${id}`);
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            { bloodRequest },
            `Request Fetched Successfully -${user.name}`
        )
    );
});

export { createBloodRequest, getAllUserBloodRequests, getUserBloodRequest };