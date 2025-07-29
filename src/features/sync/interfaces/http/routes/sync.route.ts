import { authMiddleware } from "@shared/interfaces/http/middleware/auth.middleware.js";
import { Hono } from "hono";
import { checkUserDeviceId, getNonSyncData, syncClientData } from "../controllers/sync.controller.js";
import { validate } from "@shared/utils/validator.utils.js";
import { SyncClientDataSchema } from "../validators/sync.validator.js";

const sync = new Hono();

sync.post("/check-user-device", authMiddleware, checkUserDeviceId);
sync.post("/non-sync-data", authMiddleware, getNonSyncData);
sync.post("/sync-client-data", validate(SyncClientDataSchema), authMiddleware, syncClientData);

export default sync;
