import mongoose from "mongoose";
import { bloodGroups, bloodRequestExpiry, requestStatuses, urgencyLevels } from "../constants/constants.js";

const bloodRequestSchema = new mongoose.Schema({
    requestor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: [true, "Requestor ID is required"],
        index: true,
    },
    isForSelf: {
        type: Boolean,
        default: true,
    },
    bloodGroup: {
        type: String,
        enum: bloodGroups,
    },
    numberOfDonors: {
        type: Number,
        required: [true, "Number of donors is required"],
    },
    donors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
    }],
    city: {
        type: String,
        required: [true, "City is required"],
    },
    hospital: {
        type: String,
        default: ""
    },
    urgencyLevel: {
        type: String,
        enum: urgencyLevels,
        default: "Medium",
    },
    contactNumber: {
        type: String,
        required: [true, "Contact Number is required"],
    },
    requestStatus: {
        type: String,
        enum: requestStatuses,
        default: "Pending",
    },
    message: {
        type: String,
        default: "",
    },
    expirationDate: {
        type: Date,
        default: () => new Date(bloodRequestExpiry),
    }

}, { timestamps: true });

bloodRequestSchema.index({ expirationDate: 1 }, { expireAfterSeconds: 0 });

export const BloodRequest = mongoose.model("BloodRequests", bloodRequestSchema);