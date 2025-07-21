import { supabase } from "@config/supabase.js";
import type { SyncExercises, SyncRepository, WorkoutTemplatesFromSupabase } from "@features/sync/domain/repositories/sync.repository.js";
import type { SyncWorkoutTemplate } from "@features/sync/interfaces/http/types/sync-workout-template.type.js";
import { RequestError } from "@shared/errors/RequestError.js";

export class SyncRepositorySupabase implements SyncRepository {
  async getExercisesByUserId(userId: string, lastSync: string): Promise<SyncExercises[]> {
    const { data, error } = await supabase
      .from("exercise")
      .select("*")
      .or(`user_id.eq.${userId},user_id.is.null`)
      .eq("is_deleted", false)
      .gt("updated_at", lastSync);

    if (error) {
      throw new RequestError(`Error fetching exercises: ${error.message}`);
    }
    if (!data || !Array.isArray(data)) {
      throw new RequestError("Invalid response format from Supabase");
    }

    return data as SyncExercises[];
  }

  async checkUserDeviceId(userId: string, deviceId: string): Promise<boolean> {
    const { data, error } = await supabase.from("user").select("id").eq("user_id", userId).eq("device_id", deviceId).single();

    if (error) {
      throw new RequestError(`Error checking user device ID: ${error.message}`);
    }

    return data !== null;
  }
  async getWorkoutTemplatesToSync(userId: string, ids: number[]): Promise<WorkoutTemplatesFromSupabase[]> {
    const { data, error } = await supabase
      .from("workout_template")
      .select(
        `*,
        user: user_id (*),
        template_exercise (
          *,
          exercise: exercise_id (*),
          template_set (*)
        )`
      )
      .in("id", ids)
      .eq("user_id", userId);

    if (error) {
      throw new RequestError(`Error syncing workout templates: ${error.message}`);
    }
    if (!data || !Array.isArray(data)) {
      throw new RequestError("Invalid response format from Supabase");
    }

    console.log(`Fetched ${data} workout templates for user ${userId}`);

    return data as WorkoutTemplatesFromSupabase[];
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
