import { supabase } from "@config/supabase.js";
import type { SyncRepository } from "@features/sync/domain/repositories/sync.repository.js";
import type { SyncWorkoutTemplate } from "@features/sync/interfaces/http/types/sync-workout-template.type.js";
import { RequestError } from "@shared/errors/RequestError.js";

export class SyncRepositorySupabase implements SyncRepository {
  syncWorkoutTemplates(userId: string, templates: SyncWorkoutTemplate[]): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async getWorkoutTemplates(userId: string, lastSync: string): Promise<SyncWorkoutTemplate[]> {
    const { data, error } = await supabase.rpc("get_sync_workout_template", {
      user_id: userId,
      last_synced_at: lastSync,
    });

    if (error) {
      throw new RequestError(`Error fetching workout templates: ${error.message}`);
    }
    if (!data || !Array.isArray(data)) {
      throw new RequestError("Invalid response format from Supabase");
    }

    return data as SyncWorkoutTemplate[];
  }
}
