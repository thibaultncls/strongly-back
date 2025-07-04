import { Hono } from "hono";
import { signInWithApple, signInWithEmailAndPassword, signInWithGoogle } from "../controllers/auth.controller.js";

const auth = new Hono();

auth.post("/sign-in-with-apple", signInWithApple);
auth.post("/sign-in-with-google", signInWithGoogle);
auth.post("/sign-in-with-email-and-password", signInWithEmailAndPassword);

export default auth;
