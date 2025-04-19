import mongoose from "mongoose";

const adminAnalyticsSchema = new mongoose.Schema({
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: [true, "Admin ID is required"],
        index: true,
        unique: true,
    },
    // --- User Metrics ---
    userStats: {
        totalUsers: { type: Number, default: 0 },
        newUsersLastWeek: { type: Number, default: 0 },
    },
    // --- Request Metrics ---
    requestStats: {
        totalRequests: { type: Number, default: 0 },
        pendingRequests: { type: Number, default: 0 },
        fulfilledRequests: { type: Number, default: 0 },
        expiredRequests: { type: Number, default: 0 },
        cancelledRequests: { type: Number, default: 0 },
        avgFulfillmentTime: { type: Number, default: 0 }, // in hours
    },
    // --- Donation Metrics ---
    donationStats: {
        totalDonations: { type: Number, default: 0 },
        successfulDonations: { type: Number, default: 0 },
        cancelledDonations: { type: Number, default: 0 },
        avgDonationPerUser: { type: Number, default: 0 },
    },
    lastCalculatedAt: { type: Date, default: () => new Date }

}, { timestamps: true });

export const AdminAnalytics = mongoose.model("AdminAnalytics", adminAnalyticsSchema);