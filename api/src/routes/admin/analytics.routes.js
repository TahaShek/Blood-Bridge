import { Router } from "express"
import { verifyJwt } from "../../middlewares/auth.middleware.js"
import { getAdminAnalytics } from "../../controllers/admin/adminAnalytics.controller.js";

const router = Router();

router.route("/").get(verifyJwt, getAdminAnalytics);

export default router;