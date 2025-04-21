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
    // TODO: Pending -> Fulfilled
    if (fromStatus) incObj[`requestStats.${fromStatus.toLowerCase()}`] = -1;
    if (toStatus) incObj[`requestStats.${toStatus.toLowerCase()}`] = 1;

    await UserAnalytics.findOneAndUpdate(
        { user: userId },
        {
            $inc: incObj,
        }
    );
};

export { ensureUserAnalytics, incrementRequestStats, updateRequestStatusStats, createUserRecord };