
import mongoose from "mongoose";
import { BloodRequest } from "../../models/bloodRequest.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { incrementDonationStats, incrementRequestStats, updateRequestStatusStats } from "../../features/user/analytics.feature.js";
import { incrementTotalBloodRequestsStats } from "../../features/admin/adminAnalytics.feature.js";
import { sendBloodRequestNotification } from "../../features/notifications/fcm.feature.js";
import { requestFilters, requestStatuses } from "../../constants/constants.js";
import { buildFilters, paginateQuery, validateEnumValues } from "../../utils/databaseHelpers.js";

const createBloodRequest = asyncHandler(async (req, res) => {
    const { user } = req;

    const bloodRequest = await BloodRequest.create({
        requestor: user._id,
        ...req.body
    });

    if (!bloodRequest) {
        throw new ApiError(500, "Something went wrong while creating request");
    }

    const notificationStat = await sendBloodRequestNotification({ ...req.body, requestorName: user.name, requestorId: user._id })

    const notificationStatus = notificationStat;

    // TODO: to with automation instead of manual
    await incrementRequestStats(user._id);

    await incrementTotalBloodRequestsStats();

    return res.status(201).json(
        new ApiResponse(
            201,
            { bloodRequest, notificationStatus },
            "Request Created Successfully"
        )
    );
});

const getAllUserBloodRequests = asyncHandler(async (req, res) => {
    const { user } = req;

    const query = {
        requestor: user._id,
        ...buildFilters(req.query, requestFilters)
    }

    console.log(query)

    const { results, ...pagination } = await paginateQuery(BloodRequest, query, req.query);

    if (results.length === 0) {
        throw new ApiError(404, `No requests found against user - ${user.name}`);
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                bloodRequests: results,
                pagination: pagination,
            },
            `Requests Fetched Successfully - ${user.name}`
        )
    )
});

const getUserBloodRequest = asyncHandler(async (req, res) => {
    const { user } = req;

    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        throw new ApiError(400, "Invalid request id");
    }

    const bloodRequest = await BloodRequest.findOne({ _id: id, requestor: user._id });

    if (!bloodRequest) {
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

const getAllAvailableBloodRequests = asyncHandler(async (req, res) => {
    const { user } = req;
    if (!user.isDonating) {
        throw new ApiError(401, "access denied -only donators allowed");
    }

    const query = {
        ...buildFilters(req.query, requestFilters)
    }

    const { results: bloodRequests, ...pagination } = await paginateQuery(BloodRequest, query, req.query);

    return res.status(200).json(
        new ApiResponse(
            200,
            { bloodRequests, pagination },
            "Blood Requests fetched successfully"
        )
    );
});

const concludeBloodRequest = asyncHandler(async (req, res) => {
    const { user } = req;
    const { id } = req.params;
    const { action } = req.body;

    if (!mongoose.isValidObjectId(id)) {
        throw new ApiError(400, "Invalid request id");
    }

    const bloodRequest = await BloodRequest.findById(id);

    if (!bloodRequest || bloodRequest.requestor.toString() !== user._id) {
        throw new ApiError(404, "Either Blood Request does not exist/expired or requesting user is not the creater of it");
    }

    if(bloodRequest.requestStatus !== "Pending") {
        throw new ApiError(400, "This request is not in pending status");
    }

    if (!validateEnumValues(requestStatuses, action)) {
        throw new ApiError(400, `Invalid action field - valid values are : ${requestStatuses.join(", ")}`)
    }

    const prevStatus = bloodRequest.requestStatus;

    bloodRequest.requestStatus = action;
    // add jobs to start the timer of donors as well
    await bloodRequest.save();

    await updateRequestStatusStats(user._id, prevStatus, action);

    return res.status(200).json(
        new ApiResponse(
            200,
            { bloodRequest },
            `Blood Request concluded successfully - Status: ${action}`
        )
    )
});

const addDonorInBloodRequest = asyncHandler(async (req, res) => {
    const {user} = req;
    const {id} = req.params;

    if(!user.isDonating) {
        throw new ApiError(401, `User donating status is set to false - ${user.name}, Donating Status: ${user.isDonating}`);
    }

    const bloodRequest = await BloodRequest.findByIdAndUpdate(id);

    if(!bloodRequest) {
        throw new ApiError(404, "Blood request not found");
    }

    const alreadyDonated = bloodRequest.donors.some(donor => donor.equals(user._id));

    if(alreadyDonated) {
        throw new ApiError(400, "You are already added as a donor to this request");
    }

    if(bloodRequest.donors.length >= bloodRequest.numberOfDonors) {
        throw new ApiError(400, "This request already has the required number of donors");
    }

    bloodRequest.donors.push(user._id);

    if(bloodRequest.donors.length === bloodRequest.numberOfDonors) {
        bloodRequest.requestStatus = "Fulfilled";
    }

    await bloodRequest.save();

    const totalDonationsByUser = await incrementDonationStats(user._id, bloodRequest.requestStatus === "Fulfilled");

    return res.status(200).json(
        new ApiResponse(
            200,
            { bloodRequest },
            `Donor successfully added - ${user.name}, totalDonations: ${totalDonationsByUser}`
        )
    )

});

export { createBloodRequest, getAllUserBloodRequests, getUserBloodRequest, getAllAvailableBloodRequests, concludeBloodRequest, addDonorInBloodRequest };