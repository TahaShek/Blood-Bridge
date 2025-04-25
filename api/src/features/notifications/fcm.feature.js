import { admin } from "../../firebase/firebase-admin.js";
import { Notification } from "../../models/notifications.model.js";
import { User } from "../../models/user.model.js"

const sendBloodRequestNotification = async ({ bloodRequestId, bloodGroup, city, requestorName, requestorId, title = "Blood Donation Request", urgencyLevel }) => {
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

        console.log("tokens", uniqueTokens);

        const message = {
            notification: {
                title: title,
                body: `${requestorName} needs ${bloodGroup} near ${city} - urgency: ${urgencyLevel}`,
            },
            // data: {
            //     bloodRequestId: bloodRequestId,  // Custom data to navigate to
            //     bloodGroup: bloodGroup,
            //     city: city,
            //     urgencyLevel: urgencyLevel.toString(),
            //     click_action: 'FLUTTER_NOTIFICATION_CLICK', // This is a special action key
            //   },
            tokens: uniqueTokens,
        };

        await admin.messaging().sendEachForMulticast(message);
        console.log(`Notification sent to ${tokens.length} users`);

        await Notification.insertMany(
            users.map(u => ({
                user: u._id,
                title,
                message: `${requestorName} needs ${bloodGroup} near ${city} - urgency: ${urgencyLevel}`,
                relatedRequest: bloodRequestId,
                type: "Blood Request",
            }))
        );

        return {
            status: 200,
            message: `Notifications Sent to ${tokens.length} users`
        };

    } catch (error) {
        console.error("FCM send error:", error?.message);
    }

    const uniqueTokens = [...new Set(tokens)];

    console.log("tokens", uniqueTokens);

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
      message: `Notifications Sent to ${tokens.length} users`,
    };
  } catch (error) {
    console.error("FCM send error:", error?.message);
  }
};

const sendDonorAddedNotification = async (userId, bloodRequestId, donorId, donorName, donorContact, donorCity, donorBloodGroup, title = "Donor Available") => {
    try {
        const owner = await User.findById(userId);

    const token = owner.fcmToken;

    console.log("owner", owner.fcmToken);

    const message = {
      notification: {
        title: title,
        body: `${donorName} accepted your blood request! phone: ${donorContact} - city: ${donorCity} - blood group: ${donorBloodGroup}`,
      },
      tokens: [token],
    };

    await admin.messaging().sendEachForMulticast(message);
    console.log(`Notification sent to ${owner.name}`);

        await Notification.create({
            user: owner._id,
            title,
            message: `${donorName} accepted your blood request! phone: ${donorContact} - city: ${donorCity} - blood group: ${donorBloodGroup}`,
            relatedRequest: bloodRequestId,
            relatedUsers: donorId,
            type: "Donor Added"
        });

        return {
            status: 200,
            message: `Notifications Sent to ${owner.name}`
        };
    } catch (error) {
        console.error("FCM send error:", error?.message);
    }
};

export { sendBloodRequestNotification, sendDonorAddedNotification };
