import {Router} from "express"
import { verifyJwt } from "../../middlewares/auth.middleware.js"
import { createBloodRequest, getAllUserBloodRequests, getUserBloodRequest } from "../../controllers/user/bloodRequest.controller.js";
import { validateRequest } from "../../middlewares/validate.middleware.js";
import { createBloodRequestSchema } from "../../validators/user/bloodRequest.validator.js";

const router = Router();

router.route("/").get(verifyJwt, getAllUserBloodRequests);

router.route("/:id").get(verifyJwt, getUserBloodRequest);

router.route("/create").post(verifyJwt, validateRequest(createBloodRequestSchema), createBloodRequest);

export default router;