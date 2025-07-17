import { authMiddleware } from "@shared/interfaces/http/middleware/auth.middleware.js";
import { Hono } from "hono";
import { getClientWorkoutTemplates } from "../controllers/sync.controller.js";

const sync = new Hono();

sync.post("/workout-templates", authMiddleware, getClientWorkoutTemplates);

export default sync;
