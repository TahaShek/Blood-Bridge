import { Router } from "express";
import { verifyJwt } from "../../middlewares/auth.middleware.js";
import { getUserAanalytics } from "../../controllers/user/analytics.controller.js";

const router = Router();

router.route("/").get(verifyJwt, getUserAanalytics);

export default router;