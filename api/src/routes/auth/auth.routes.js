import { Router } from "express"
import { verifyJwt } from "../../middlewares/auth.middleware.js"
import { logOut, refreshAccessToken, signIn, signUp, tryMe } from "../../controllers/auth/auth.controller.js";
import { validateRequest } from "../../middlewares/validate.middleware.js"
import { signInSchema, signUpSchema } from "../../validators/auth/auth.validator.js"

const router = Router();

router.route("/sign-up").post(validateRequest(signUpSchema), signUp);

router.route("/sign-in").post(validateRequest(signInSchema), signIn);

router.route("/logout").post(verifyJwt, logOut);

router.route("/refresh-token").post(refreshAccessToken);

router.route("/try-me").get(tryMe);

export default router;