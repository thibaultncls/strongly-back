import { authMiddleware } from "@shared/interfaces/http/middleware/auth.middleware.js";
import { Hono } from "hono";
import { getWorkoutTemplates } from "../controllers/dashboard.controller.js";

const dashboard = new Hono();

dashboard.get("/get-workouts-template", authMiddleware, getWorkoutTemplates);

export default dashboard;
