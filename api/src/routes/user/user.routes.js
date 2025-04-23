import { Router } from "express";
import { getActiveDonors } from "../../controllers/user/user.controller.js";

const router = Router();

router.route("/active-donors").get(getActiveDonors);

export default router;