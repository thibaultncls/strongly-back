import type { Context } from "hono";
import { InvalidArgumentsError } from "@shared/errors/InvalidArgumentsError.js";
import { RequestError } from "@hono/node-server";
import { container } from "@config/inversify.js";
import { TYPES } from "@shared/constants/identifier.constant.js";
import type { CheckUserDeviceUseCase } from "@features/sync/application/use-cases/check_user_device.usecase.js";
import type { GetNonSyncDataUseCase } from "@features/sync/application/use-cases/get-non-sync-data.usecase.js";

export async function checkUserDeviceId(c: Context) {
  const userId = c.get("user").id;
  const { deviceId } = await c.req.json();

  try {
    const isValid = await container.get<CheckUserDeviceUseCase>(TYPES.CHECK_USER_DEVICE_USE_CASE).execute(userId, deviceId);

    return c.json({ isValid });
  } catch (error: any) {
    if (error instanceof InvalidArgumentsError) {
      return c.json({ error: error.message }, 400);
    }
    if (error instanceof RequestError) {
      return c.json({ error: error.message }, 500);
    }
    console.error("Error checking user device ID:", error);
    return c.json({ error: "Failed to check user device ID" }, 500);
  }
}

export async function getNonSyncData(c: Context) {
  const userId = c.get("user").id;
  const { lastSync, deviceId } = await c.req.json();

  try {
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
