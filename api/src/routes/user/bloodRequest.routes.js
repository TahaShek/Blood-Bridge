import {Router} from "express"
import { verifyJwt } from "../../middlewares/auth.middleware.js"
import { addDonorInBloodRequest, concludeBloodRequest, createBloodRequest, getAllAvailableBloodRequests, getAllUserBloodRequests, getUserBloodRequest } from "../../controllers/user/bloodRequest.controller.js";
import { validateRequest } from "../../middlewares/validate.middleware.js";
import { createBloodRequestSchema } from "../../validators/user/bloodRequest.validator.js";

const router = Router();

router.route("/").get(verifyJwt, getAllUserBloodRequests);

router.route("/available-requests").get(verifyJwt, getAllAvailableBloodRequests);

router.route("/create").post(verifyJwt, validateRequest(createBloodRequestSchema), createBloodRequest);

router.route("/:id").get(verifyJwt, getUserBloodRequest);

router.route("/add-donor/:id").put(verifyJwt, addDonorInBloodRequest);

router.route("/conclude-request/:id").put(verifyJwt, concludeBloodRequest);

export default router;