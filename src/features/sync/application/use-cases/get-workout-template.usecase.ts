import type { SyncRepository } from "@features/sync/domain/repositories/sync.repository.js";
import type { SyncWorkoutTemplate } from "@features/sync/interfaces/http/types/sync-workout-template.type.js";
import { InvalidArgumentsError } from "@shared/errors/InvalidArgumentsError.js";

export class getWorkoutTemplatesUseCase {
  constructor(private readonly syncRepository: SyncRepository) {}

  async execute(userId: string, lastSync: string): Promise<SyncWorkoutTemplate[]> {
    if (!userId || !lastSync) {
      throw new InvalidArgumentsError("User ID and last sync date are required");
    }

    const templates = await this.syncRepository.getWorkoutTemplates(userId, lastSync);
    return templates;
  }
}
