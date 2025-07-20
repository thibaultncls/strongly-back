import { authMiddleware } from "@shared/interfaces/http/middleware/auth.middleware.js";
import { Hono } from "hono";
import { checkUserDeviceId, getClientWorkoutTemplates, getWorkoutTemplates } from "../controllers/sync.controller.js";

const sync = new Hono();

sync.post("/workout-templates", authMiddleware, getClientWorkoutTemplates);
sync.post("/get-workout-templates", authMiddleware, getWorkoutTemplates);
sync.post("/check-user-device", authMiddleware, checkUserDeviceId);

export default sync;
