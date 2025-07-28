import { Hono } from "hono";
import { getCurrentUser, refreshToken, sendOtp, signInWithApple, signInWithGoogle, verifyOtp } from "../controllers/auth.controller.js";
import { validate } from "@shared/utils/validator.utils.js";
import { SendOtpValidator, VerifyOtpValidator } from "../validators/auth.validator.js";

const auth = new Hono();

auth.post("/sign-in-with-apple", signInWithApple);
auth.post("/sign-in-with-google", signInWithGoogle);
auth.post("/send-otp", validate(SendOtpValidator), sendOtp);
auth.post("/verify-otp", validate(VerifyOtpValidator), verifyOtp);
auth.post("/refresh-token", refreshToken);
auth.post("/current-user", getCurrentUser);

export default auth;
