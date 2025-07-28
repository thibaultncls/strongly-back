import type { DashboardRepository, WorkoutTemplate } from "@features/dashboard/domain/repositories/dashboard.repository.js";
import { InvalidArgumentsError } from "@shared/errors/InvalidArgumentsError.js";

export class GetWorkoutTemplatesUseCase {
  constructor(private dashboardRepository: DashboardRepository) {}

  async execute(userId?: string): Promise<WorkoutTemplate[]> {
    if (!userId) {
      throw new InvalidArgumentsError("User ID is required");
    }

    return this.dashboardRepository.getWorkoutTemplates(userId);
  }
}
