import { authMiddleware } from "@shared/interfaces/http/middleware/auth.middleware.js";
import { Hono } from "hono";
import { getWorkoutTemplatesUpdate } from "../controllers/dashboard.controller.js";

const dashboard = new Hono();

dashboard.get("/workouts-template-update", authMiddleware, getWorkoutTemplatesUpdate);

export default dashboard;
