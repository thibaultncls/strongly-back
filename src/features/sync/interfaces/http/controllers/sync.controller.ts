import type { Context } from "hono";
import { InvalidArgumentsError } from "@shared/errors/InvalidArgumentsError.js";
import { RequestError } from "@hono/node-server";
import { container } from "@config/inversify.js";
import { TYPES } from "@shared/constants/identifier.constant.js";
import type { GetNonSyncDataUseCase } from "@features/sync/application/use-cases/get-non-sync-data.usecase.js";
import type { SyncClientDataUseCase } from "@features/sync/application/use-cases/sync-client-data.usecase.js";

export async function getNonSyncData(c: Context) {
  const userId = c.get("user").id;
  const { lastSync, deviceId } = await c.req.json();

  try {
    console.log("Fetching non-sync data for user:", userId, "lastSync:", lastSync, "deviceId:", deviceId);

    const nonSyncData = await container.get<GetNonSyncDataUseCase>(TYPES.GET_NON_SYNC_DATA_USE_CASE).execute(userId, lastSync, deviceId);
    return c.json({ nonSyncData });
  } catch (error: any) {
    console.error("Error fetching non-sync data:", error);
    if (error instanceof RequestError) {
      return c.json({ error: error.message }, 500);
    } else if (error instanceof InvalidArgumentsError) {
      return c.json({ error: error.message }, 400);
    }
    return c.json({ error: "Failed to fetch non-sync data" }, 500);
  }
}

export async function syncClientData(c: Context) {
  const { data } = await c.req.json();

  try {
    await container.get<SyncClientDataUseCase>(TYPES.SYNC_CLIENT_DATA_USE_CASE).execute(data);
    return c.json({ message: "Data synced successfully" });
  } catch (error: any) {
    console.error("Error syncing client data:", error);
    if (error instanceof RequestError) {
      return c.json({ error: error.message }, 500);
    } else if (error instanceof InvalidArgumentsError) {
      return c.json({ error: error.message }, 400);
    }
    return c.json({ error: "Failed to sync client data" }, 500);
  }
}
