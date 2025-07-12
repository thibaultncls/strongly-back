import { supabase } from "@config/supabase.js";
import type {
  DashboardRepository,
  WorkoutTemplate,
  WorkoutTemplateUpdate,
} from "@features/dashboard/domain/repositories/dashboard.repository.js";
import { RequestError } from "@shared/errors/RequestError.js";

export class DashboardRepositorySupabase implements DashboardRepository {
  async getTemplateUpdates(userId: string): Promise<WorkoutTemplateUpdate[]> {
    const { data, error } = await supabase.rpc("get_template_updates", { user_id: userId });

    if (error) {
      throw new RequestError(`Error fetching template updates: ${error.message}`);
    }

    if (!data) {
      return [];
    }

    const updates: unknown = data;

    return (updates as WorkoutTemplateUpdate[]) || [];
  }

  getWorkoutTemplates(userId: string): Promise<WorkoutTemplate[]> {
    throw new Error("Method not implemented.");
  }
}
