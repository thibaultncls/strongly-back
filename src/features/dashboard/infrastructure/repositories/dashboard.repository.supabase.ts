import { supabase } from "@config/supabase.js";
import type { DashboardRepository, WorkoutTemplate } from "@features/dashboard/domain/repositories/dashboard.repository.js";
import { RequestError } from "@shared/errors/RequestError.js";

export class DashboardRepositorySupabase implements DashboardRepository {
  getWorkoutTemplates(userId: string): Promise<WorkoutTemplate[]> {
    throw new Error("Method not implemented.");
  }
}
