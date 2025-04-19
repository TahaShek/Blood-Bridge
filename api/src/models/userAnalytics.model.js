import mongoose from "mongoose";

const userAnalyticsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
        index: true,
    },
    requestStats: {
        total: { type: Number, default: 0 },
        pending: { type: Number, default: 0 },
        expired: { type: Number, default: 0 },
        fulfilled: { type: Number, default: 0 },
        cancelled: { type: Number, default: 0 },
    },

    donationStats: {
        total: { type: Number, default: 0 },
        successful: { type: Number, default: 0 },
        cancelled: { type: Number, default: 0 },
    },

    lastRequestAt: { type: Date },
    lastDonationAt: { type: Date },
    lastLoginAt: { type: Date },
}, { timestamps: true });

export const UserAnalytics = mongoose.model("UserAnalytics", userAnalyticsSchema);