import { container } from "@config/inversify.js";
import type { GetNonSyncDataUseCase } from "@features/sync/application/use-cases/get-non-sync-data.usecase.js";
import type { SyncClientDataUseCase } from "@features/sync/application/use-cases/sync-client-data.usecase.js";
import { SyncSubRevenueCatService } from "@features/sync/infrastructure/services/sync-sub.revenue-cat.service.js";
import { RequestError } from "@hono/node-server";
import { TYPES } from "@shared/constants/identifier.constant.js";
import { InvalidArgumentsError } from "@shared/errors/InvalidArgumentsError.js";
import { PremiumRequiredError } from "@shared/errors/premium-required.error.js";
import type { Context } from "hono";

export async function getNonSyncData(c: Context) {
  const userId = c.get("user").id;
  const { lastSync } = await c.req.json();

  try {
    console.log("Fetching non-sync data for user:", userId, "lastSync:", lastSync);

    const nonSyncData = await container.get<GetNonSyncDataUseCase>(TYPES.GET_NON_SYNC_DATA_USE_CASE).execute(userId, lastSync);
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
  const userId = c.get("user").id;
  const { data } = await c.req.json();

  try {
    await container.get<SyncClientDataUseCase>(TYPES.SYNC_CLIENT_DATA_USE_CASE).execute(data, userId);
    return c.json({ message: "Data synced successfully" });
  } catch (error: any) {
    console.error("Error syncing client data:", error);
    if (error instanceof RequestError) {
      return c.json({ error: error.message }, 500);
    } else if (error instanceof InvalidArgumentsError) {
      return c.json({ error: error.message }, 400);
    } else if (error instanceof PremiumRequiredError) {
      return c.json({ error: error.message }, 402);
    }
    return c.json({ error: "Failed to sync client data" }, 500);
  }
}

export async function isUserPremium(c: Context) {
  const userId = c.get("user").id;
  try {
    const SyncSub = new SyncSubRevenueCatService();
    const isPremium = await SyncSub.isUserPremium(userId);
    return c.json({ isPremium });
  } catch (error) {
    return c.json({ error: "Failed to fetch subscription status" }, 500);
  }
}
