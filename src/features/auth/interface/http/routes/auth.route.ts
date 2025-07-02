import { Hono } from "hono";
import { signInWithApple } from "../controllers/auth.controller.js";

const auth = new Hono();

auth.post("/sign-in-with-apple", signInWithApple);

export default auth;
