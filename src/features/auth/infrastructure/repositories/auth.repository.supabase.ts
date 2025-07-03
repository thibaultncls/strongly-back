import { supabase } from "@config/supabase.js";
import type { AuthRepository } from "@features/auth/domain/repositories/auth.repository.js";

export class AuthRepositorySupabase implements AuthRepository {
  async checkIfUserExistsByUuid(uuId: string): Promise<boolean> {
    const { data, error } = await supabase
      .from("user")
      .select("*")
      .eq("id", uuId)
      .single();

    if (error) {
      console.error(`Error checking user existence: ${error.message}`);
      return false;
    }
    return !!data;
  }
}
