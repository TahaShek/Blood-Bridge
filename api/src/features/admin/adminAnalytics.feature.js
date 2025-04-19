import { AdminAnalytics } from "../../models/adminAnalytics.model.js";
import { ApiError } from "../../utils/ApiError.js";

const createAdminRecord = async (adminId) => {
    const adminRecord = await AdminAnalytics.create({
        admin: adminId,
    });

    if (!adminRecord) {
        throw new ApiError(500, "Something went wrong while creating admin record");
    }
    return adminRecord;
};

const ensureAdminAnalytics = async (adminId) => {
    let analytics = await AdminAnalytics.findOne({ admin: adminId });
    if (!analytics) {
        analytics = await AdminAnalytics.create({ admin: adminId });
    }
    return analytics;
};

const incrementUserStatsOnSignup = async (newUser) => {
    if (newUser.role === "admin") return;

    await AdminAnalytics.findOneAndUpdate(
        {},
        {
            $inc: { "userStats.totalUsers": 1 },
            ...(newUser.createdAt >= Date.now() - 7 * 24 * 60 * 60 * 1000
                ? { $inc: { "userStats.newUsersLastWeek": 1 } }
                : {}),
        },
        { upsert: true }
    );
};

const incrementTotalBloodRequestsStats = async () => {

    await AdminAnalytics.findOneAndUpdate(
        {},
        {
            $inc: {
                "requestStats.totalRequests": 1,
                "requestStats.pendingRequests": 1,
            },
            $set: {
                lastCalculatedAt: new Date(),
            },
        }
    );
};

export { createAdminRecord, ensureAdminAnalytics, incrementUserStatsOnSignup, incrementTotalBloodRequestsStats };