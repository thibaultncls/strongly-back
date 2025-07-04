import { Hono } from "hono";
import { signInWithApple, signInWithGoogle } from "../controllers/auth.controller.js";

const auth = new Hono();

auth.post("/sign-in-with-apple", signInWithApple);
auth.post("/sign-in-with-google", signInWithGoogle);

export default auth;
