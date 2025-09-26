export interface SyncSubService {
  isUserPremium(userId: string): Promise<SubscriptionStatus>;
}

export interface SubscriptionStatus {
  isPremium: boolean;
  lastExpDate: Date | null;
}
