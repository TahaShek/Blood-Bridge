import { UserAnalytics } from "../../models/userAnalytics.model.js";
import { ApiError } from "../../utils/ApiError.js";

const createUserRecord = async (userId) => {
    const userRecord = await UserAnalytics.create({
        user: userId,
    });

    if(!userRecord) {
        throw new ApiError(500, "Something went wrong while creating user record");
    }
    return userRecord;
};

const ensureUserAnalytics = async (userId) => {
    let analytics = await UserAnalytics.findOne({ user: userId });
    if (!analytics) {
        analytics = await UserAnalytics.create({ user: userId });
    }
    return analytics;
};

const incrementRequestStats = async (userId) => {
    const userAnalytics = await ensureUserAnalytics(userId);

    userAnalytics.requestStats.total += 1;
    userAnalytics.requestStats.pending += 1;
    userAnalytics.lastRequestAt = new Date();

    await userAnalytics.save();
};

const updateRequestStatusStats = async (userId, fromStatus, toStatus) => {
    const incObj = {};

    if (fromStatus) incObj[`requestStats.${fromStatus}`] = -1;
    if (toStatus) incObj[`requestStats.${toStatus}`] = 1;

    await UserAnalytics.findOneAndUpdate(
        { user: userId },
        {
            $inc: incObj,
        }
    );
};

const incrementDonationStats = async (userId, isSuccessful) => {
    const analytics = await ensureUserAnalytics(userId);

    analytics.donationStats.total += 1;
    if(isSuccessful) {
        analytics.donationStats.successful += 1;
        analytics.lastDonationAt = Date.now();
    }

    await analytics.save();

    return analytics.donationStats.total;
}

export { ensureUserAnalytics, incrementRequestStats, updateRequestStatusStats, createUserRecord, incrementDonationStats };