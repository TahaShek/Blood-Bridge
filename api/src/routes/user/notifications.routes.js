import { Router } from "express"
import { verifyJwt } from "../../middlewares/auth.middleware.js"
import { getAllNotifications, getNotificationById } from "../../controllers/user/notifications.controller.js";

const router = Router();

router.route("/").get(verifyJwt, getAllNotifications);

router.route("/:id").get(verifyJwt, getNotificationById);

export default router;