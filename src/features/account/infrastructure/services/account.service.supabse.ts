import { supabase } from "@config/supabase.js";
import type { AccountService } from "@features/account/domain/services/account.service.js";
import { RequestError } from "@shared/errors/RequestError.js";

class AccountServiceSupabase implements AccountService {
  async revokeSessions(userId: string): Promise<void> {
    try {
      await supabase.auth.admin.signOut(userId);
    } catch (error) {
      throw new RequestError("Failed to revoke sessions");
    }
  }

  async deleteAccount(userId: string): Promise<void> {
    try {
      await supabase.auth.admin.deleteUser(userId);
    } catch (error) {
      throw new RequestError("Failed to delete account");
    }
  }
}
