import { admin } from "../../firebase/firebase-admin.js";
import { User } from "../../models/user.model.js"

const sendBloodRequestNotification = async ({ bloodGroup, city, requesterName, title = "Blood Donation Request", urgencyLevel }) => {
    try {
        const users = await User.find({ bloodGroup, city });
        const tokens = users.map((u) => u.fcmToken).filter(Boolean);

        if (!tokens.length) {
            return {
                status: 404,
                message: `No matching bloodGroup - ${bloodGroup} Found in city - ${city}`
            };
        };

        const message = {
            notification: {
                title: title,
                body: `${requesterName} needs ${bloodGroup} near ${city}`,
                urgencyLevel,
            },
            tokens,
        };

        await admin.messaging().sendEachForMulticast(message);
        console.log(`Notification sent to ${tokens.length} users`);

        return {
            status: 200,
            message: "Notifications Sent"
        };

    } catch (error) {
        console.error("FCM send error:", error?.message);
    }
};

export { sendBloodRequestNotification };