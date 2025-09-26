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
    console.log("RevenueCat data:", data.subscriber.subscriptions);

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

  // Result for non premium user :
  //{
  //   "isPremium": {
  //     "request_date": "2025-09-26T09:05:18Z",
  //     "request_date_ms": 1758877518116,
  //     "subscriber": {
  //       "entitlements": {},
  //       "first_seen": "2025-09-26T09:00:42Z",
  //       "last_seen": "2025-09-26T09:00:42Z",
  //       "management_url": null,
  //       "non_subscriptions": {},
  //       "original_app_user_id": "ad4c1e9a-da1d-4778-9fbe-d029c9ba24f3",
  //       "original_application_version": null,
  //       "original_purchase_date": null,
  //       "other_purchases": {},
  //       "subscriptions": {}
  //     }
  //   }
  // }

  // Result for premium user :

  //   {
  //   "isPremium": {
  //     "request_date": "2025-09-26T09:08:12Z",
  //     "request_date_ms": 1758877692574,
  //     "subscriber": {
  //       "entitlements": {
  //         "Premium": {
  //           "expires_date": null,
  //           "grace_period_expires_date": null,
  //           "product_identifier": "strongly_premium_life_time",
  //           "purchase_date": "2025-09-25T15:00:03Z"
  //         }
  //       },
  //       "first_seen": "2025-09-19T09:13:29Z",
  //       "last_seen": "2025-09-26T09:01:10Z",
  //       "management_url": null,
  //       "non_subscriptions": {
  //         "strongly_premium_life_time": [
  //           {
  //             "display_name": "Premium Lifetime",
  //             "id": "o1_COnkdaterGHcEtUIEiNAaw",
  //             "is_sandbox": true,
  //             "original_purchase_date": "2025-09-25T15:00:03Z",
  //             "price": {
  //               "amount": 119.99,
  //               "currency": "EUR"
  //             },
  //             "purchase_date": "2025-09-25T15:00:03Z",
  //             "store": "app_store",
  //             "store_transaction_id": "2000001021035781"
  //           }
  //         ]
  //       },
  //       "original_app_user_id": "$RCAnonymousID:e39a5e2db3124733ba78b8e52cdc92cf",
  //       "original_application_version": "1.0",
  //       "original_purchase_date": "2013-08-01T07:00:00Z",
  //       "other_purchases": {
  //         "strongly_premium_life_time": {
  //           "display_name": "Premium Lifetime",
  //           "price": {
  //             "amount": 119.99,
  //             "currency": "EUR"
  //           },
  //           "purchase_date": "2025-09-25T15:00:03Z"
  //         }
  //       },
  //       "subscriber_attributes": {
  //         "$attConsentStatus": {
  //           "updated_at_ms": 1758700857586,
  //           "value": "denied"
  //         }
  //       },
  //       "subscriptions": {
  //         "strongly_premium_monthly": {
  //           "auto_resume_date": null,
  //           "billing_issues_detected_at": null,
  //           "display_name": "Premium Monthly",
  //           "expires_date": "2025-09-24T09:01:07Z",
  //           "grace_period_expires_date": null,
  //           "is_sandbox": true,
  //           "management_url": "https://apps.apple.com/account/subscriptions",
  //           "original_purchase_date": "2025-09-24T08:00:56Z",
  //           "ownership_type": "PURCHASED",
  //           "period_type": "normal",
  //           "price": {
  //             "amount": 4.99,
  //             "currency": "EUR"
  //           },
  //           "purchase_date": "2025-09-24T08:56:07Z",
  //           "refunded_at": null,
  //           "store": "app_store",
  //           "store_transaction_id": "2000001019785337",
  //           "unsubscribe_detected_at": null
  //         },
  //         "strongly_premium_yearly": {
  //           "auto_resume_date": null,
  //           "billing_issues_detected_at": null,
  //           "display_name": "Premium Yearly",
  //           "expires_date": "2025-09-24T12:20:19Z",
  //           "grace_period_expires_date": null,
  //           "is_sandbox": true,
  //           "management_url": "https://apps.apple.com/account/subscriptions",
  //           "original_purchase_date": "2025-09-24T08:00:56Z",
  //           "ownership_type": "PURCHASED",
  //           "period_type": "normal",
  //           "price": {
  //             "amount": 49.99,
  //             "currency": "EUR"
  //           },
  //           "purchase_date": "2025-09-24T11:20:19Z",
  //           "refunded_at": null,
  //           "store": "app_store",
  //           "store_transaction_id": "2000001019950831",
  //           "unsubscribe_detected_at": "2025-09-24T11:21:27Z"
  //         }
  //       }
  //     }
  //   }
  // }
}
