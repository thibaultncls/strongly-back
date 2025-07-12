import type { DashboardRepository, WorkoutTemplateUpdate } from "@features/dashboard/domain/repositories/dashboard.repository.js";
import { InvalidArgumentsError } from "@shared/errors/InvalidArgumentsError.js";

export class GetWorkoutsTemplateUpdateUseCase {
  constructor(private readonly dashboardRepository: DashboardRepository) {}

  async execute(userId: string): Promise<WorkoutTemplateUpdate[]> {
    if (!userId) {
      throw new InvalidArgumentsError("User ID is required to fetch workout template updates.");
    }

    return this.dashboardRepository.getTemplateUpdates(userId);
  }
}
