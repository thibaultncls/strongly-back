import { Hono } from "hono";
import { getCurrentUser, refreshToken, sendOtp, signInWithApple, signInWithGoogle, verifyOtp } from "../controllers/auth.controller.js";

const auth = new Hono();

auth.post("/sign-in-with-apple", signInWithApple);
auth.post("/sign-in-with-google", signInWithGoogle);
auth.post("/send-otp", sendOtp);
auth.post("/verify-otp", verifyOtp);
auth.post("/refresh-token", refreshToken);
auth.post("/current-user", getCurrentUser);

export default auth;
