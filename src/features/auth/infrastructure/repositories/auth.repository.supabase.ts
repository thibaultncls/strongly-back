import { supabase } from "@config/supabase.js";
import type { AuthRepository } from "@features/auth/domain/repositories/auth.repository.js";
import { CreateError } from "@shared/errors/CreateError.js";

export class AuthRepositorySupabase implements AuthRepository {
  async getUserCreatedAt(uuId: string): Promise<string> {
    const { data, error } = await supabase.from("user").select("created_at").eq("id", uuId).single();

    if (error) {
      console.error(`Error fetching user created at: ${error.message}`);
      throw new Error(`Failed to fetch user created at for UUID ${uuId}: ${error.message}`);
    }

    return data.created_at;
  }

  async createUser(uuId: string, email?: string): Promise<void> {
    const { error } = await supabase.from("user").insert({
      id: uuId,
      email: email,
      name: null,
    });

    if (error) {
      console.error(`Error creating user: ${error.message}`);
      throw new CreateError(`Failed to create user with UUID ${uuId}: ${error.message}`);
    }
  }

  async checkIfUserExistsByUuid(uuid: string): Promise<boolean> {
    const { data, error } = await supabase.from("user").select("*").eq("id", uuid).single();

    if (error) {
      console.error(`Error checking user existence: ${error.message}`);
      return false;
    }
    return !!data;
  }
}
