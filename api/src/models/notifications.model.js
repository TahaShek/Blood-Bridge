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
    relatedUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
    }],
    receivedAt: {
        type: Date,
        default: () => new Date,
    }
}, { timestamps: true });

export const Notification = mongoose.model("Notifications", notificationSchema);