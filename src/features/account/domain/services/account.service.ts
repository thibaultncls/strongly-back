export interface AccountService {
  revokeSessions(userId: string): Promise<void>;
  deleteAccount(userId: string): Promise<void>;
}
