export const DB_NAME = "bloodBridge";

export const ROLES = ["admin", "user"];

export const bloodGroups = ["Any", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export const urgencyLevels = ["Low", "Medium", "High", "Critical"];

export const requestStatuses = ["Pending", "Cancelled", "Expired", "Fulfilled"];

export const requestFilters = {
    city: { regex: false },
    bloodGroup: { regex: false },
    hospital: { regex: true },
    urgencyLevel: { regex: false },
    requestStatus: { regex: false }
};

export const userFilters = {
    city: { regex: false },
    bloodGroup: { regex: false },
};


export const MaxAgeOfAccessToken = process.env.ACCESS_TOKEN_EXPIRY || 86400000; // 1d
export const MaxAgeOfRefreshToken = process.env.REFRESH_TOKEN_EXPIRY || 7 * 24 * 60 * 60 * 1000; // 7d