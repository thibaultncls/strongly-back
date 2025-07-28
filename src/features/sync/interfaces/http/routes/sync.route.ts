import { authMiddleware } from "@shared/interfaces/http/middleware/auth.middleware.js";
import { Hono } from "hono";
import { checkUserDeviceId, getNonSyncData } from "../controllers/sync.controller.js";

const sync = new Hono();

sync.post("/check-user-device", authMiddleware, checkUserDeviceId);
sync.post("/non-sync-data", authMiddleware, getNonSyncData);

export default sync;
