export interface AccountRepository {
  deleteAccountById(userId: string): Promise<void>;
}
