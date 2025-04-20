import { Router } from "express"
import { verifyJwt } from "../../middlewares/auth.middleware.js"
import { saveToken } from "../../controllers/fcm/fcm.controller.js";

const router = Router();

router.route("/save-token").post(verifyJwt, saveToken);

export default router;