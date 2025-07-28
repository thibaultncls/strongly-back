import { supabase } from "@config/supabase.js";
import type { IdAndUpdatedAt, SyncRepository } from "@features/sync/domain/repositories/sync.repository.js";
import { RequestError } from "@shared/errors/RequestError.js";

export class SyncRepositorySupabase implements SyncRepository {
  async checkExercisesToSync(exercisesIds: number[]): Promise<IdAndUpdatedAt[]> {
    const { data, error } = await supabase.from("exercise").select("id, updated_at").in("id", exercisesIds);

    if (error) {
      throw new RequestError(`Error checking exercises to sync: ${error.message}`);
    }

    return data.map((exercise) => {
      return {
        id: exercise.id,
        updated_at: exercise.updated_at,
      };
    });
  }

  async updateUserDeviceId(userId: string, deviceId: string): Promise<void> {
    const { error } = await supabase.from("user").update({ device_id: deviceId }).eq("id", userId);
    if (error) {
      throw new RequestError(`Error updating user device ID: ${error.message}`);
    }
  }

  async getNonSyncData(userId: string, lastSync: string): Promise<any> {
    const { data, error, status } = await supabase.rpc("get_user_data", {
      userid: userId,
      last_sync: lastSync,
    });

    if (error) {
      throw new RequestError(`Error fetching non-sync data: ${error.message}`);
    }

    if (!data) {
      throw new RequestError("Invalid response format from Supabase");
    }

    return data;
  }

  async checkUserDeviceId(userId: string, deviceId: string): Promise<boolean> {
    const { data, error } = await supabase.from("user").select("id").eq("user_id", userId).eq("device_id", deviceId).single();

    if (error) {
      throw new RequestError(`Error checking user device ID: ${error.message}`);
    }

    return data !== null;
  }
}
