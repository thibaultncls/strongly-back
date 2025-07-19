import { authMiddleware } from "@shared/interfaces/http/middleware/auth.middleware.js";
import { Hono } from "hono";
import { getClientWorkoutTemplates, getWorkoutTemplates } from "../controllers/sync.controller.js";

const sync = new Hono();

sync.post("/workout-templates", authMiddleware, getClientWorkoutTemplates);
sync.post("/get-workout-templates", authMiddleware, getWorkoutTemplates);

export default sync;
