import { authMiddleware } from "@shared/interfaces/http/middleware/auth.middleware.js";
import { Hono } from "hono";
import { deleteAccount } from "../controllers/account.controller.js";

const account = new Hono();

account.delete("/delete", authMiddleware, deleteAccount);

export default account;
