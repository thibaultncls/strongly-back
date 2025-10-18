import { config } from "@config/config.js";
import type { SubscriptionStatus, SyncSubService } from "@features/sync/domain/services/sync-sub.service.js";

export class SyncSubRevenueCatService implements SyncSubService {
  async isUserPremium(userId: string): Promise<SubscriptionStatus> {
    const result = await fetch(`${config.revenueCat.apiUrl}/subscribers/${encodeURIComponent(userId)}`, {
      headers: {
        Authorization: `Bearer ${config.revenueCat.secretKey}`,
        Accept: "application/json",
      },
    });

    const data = await result.json();

    const subscriptions = data?.subscriber?.subscriptions ?? {};
    let lastExpDate: Date | null = null;
    for (const key in subscriptions) {
      const expiresDate = subscriptions[key].expires_date ? new Date(subscriptions[key].expires_date) : null;
      if (expiresDate && (!lastExpDate || expiresDate > lastExpDate)) {
        lastExpDate = expiresDate;
      }
    }

    const isPremium = data?.subscriber?.entitlements && Object.keys(data.subscriber.entitlements).length > 0;

    return { isPremium, lastExpDate };
  }
}
