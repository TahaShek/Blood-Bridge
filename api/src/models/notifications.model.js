import mongoose from "mongoose";


const notificationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: [true, "User is required"],
        index: true,
    },
    title: String,
    message: String,
    type: {
        type: String,
        enum: ["General", "Blood Request", "Donor Added"],
        default: "General",
    },
    isRead: {
        type: Boolean,
        default: false,
    },
    relatedRequest: { type: mongoose.Schema.Types.ObjectId, ref: "BloodRequests" },
    relatedUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
    },
}, { timestamps: true });

export const Notification = mongoose.model("Notifications", notificationSchema);