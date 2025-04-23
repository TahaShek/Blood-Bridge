import { admin } from "../../firebase/firebase-admin.js";
import { User } from "../../models/user.model.js"

const sendBloodRequestNotification = async ({ bloodGroup, city, requestorName, requestorId, title = "Blood Donation Request", urgencyLevel }) => {
    try {
        const users = await User.find({
            _id: { $ne: requestorId },
            $or: [
                { bloodGroup: bloodGroup },
                { bloodGroup: "Any" }
            ], "address.city": city,
        });

        const tokens = users.map((u) => u.fcmToken).filter(Boolean);

        if (!tokens.length) {
            return {
                status: 404,
                message: `No matching bloodGroup - ${bloodGroup} Found in city - ${city}`
            };
        };

        const uniqueTokens = [...new Set(tokens)];

        const message = {
            notification: {
                title: title,
                body: `${requestorName} needs ${bloodGroup} near ${city} - urgency: ${urgencyLevel}`,
            },
            tokens: uniqueTokens,
        };

        await admin.messaging().sendEachForMulticast(message);
        console.log(`Notification sent to ${tokens.length} users`);

        return {
            status: 200,
            message: `Notifications Sent to ${tokens.length} users`
        };

    } catch (error) {
        console.error("FCM send error:", error?.message);
    }
};

export { sendBloodRequestNotification };