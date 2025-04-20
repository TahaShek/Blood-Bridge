export const DB_NAME = "bloodBridge";

export const ROLES = ["admin", "user"];

export const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export const MaxAgeOfAccessToken = process.env.ACCESS_TOKEN_EXPIRY || 1 * 24 * 60 * 1000; // 1d
export const MaxAgeOfRefreshToken = process.env.REFRESH_TOKEN_EXPIRY || 7 * 24 * 60 * 60 * 1000; // 7d