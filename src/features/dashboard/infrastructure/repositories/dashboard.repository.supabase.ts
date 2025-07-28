import { supabase } from "@config/supabase.js";
import type { DashboardRepository, WorkoutTemplate } from "@features/dashboard/domain/repositories/dashboard.repository.js";
import { RequestError } from "@shared/errors/RequestError.js";

export class DashboardRepositorySupabase implements DashboardRepository {
  async getWorkoutTemplates(userId: string): Promise<WorkoutTemplate[]> {
    const { data, error } = await supabase.rpc("get_workout_template_with_exercise_sets", { user_id: userId });

    if (error) {
      throw new RequestError("Failed to fetch workout templates");
    }

    if (!data || !Array.isArray(data)) {
      throw new RequestError("Invalid response format for workout templates");
    }

    return data as unknown as WorkoutTemplate[];
  }
}
