import { Hono } from "hono";
import { sendOtp, signInWithApple, signInWithGoogle } from "../controllers/auth.controller.js";

const auth = new Hono();

auth.post("/sign-in-with-apple", signInWithApple);
auth.post("/sign-in-with-google", signInWithGoogle);
auth.post("/send-otp", sendOtp);

export default auth;
