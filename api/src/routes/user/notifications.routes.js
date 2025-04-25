import { Router } from "express"
import { verifyJwt } from "../../middlewares/auth.middleware.js"
import { getAllNotifications, getNotificationById, markAsRead } from "../../controllers/user/notifications.controller.js";

const router = Router();

router.route("/").get(verifyJwt, getAllNotifications);

router.route("/update/:id").put(verifyJwt, markAsRead);

router.route("/:id").get(verifyJwt, getNotificationById);

export default router;