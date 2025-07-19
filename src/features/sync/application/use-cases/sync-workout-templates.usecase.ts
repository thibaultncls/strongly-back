import type { SyncRepository } from "@features/sync/domain/repositories/sync.repository.js";
import type { SyncWorkoutTemplate } from "@features/sync/interfaces/http/types/sync-workout-template.type.js";

export class SyncWorkoutTemplatesUseCase {
  constructor(private readonly syncRepository: SyncRepository) {}

  async execute(userId: string, templates: SyncWorkoutTemplate[]): Promise<any[]> {
    const ids = templates.map((template) => template.id);
    const supabseTemplates = await this.syncRepository.getWorkoutTemplatesToSync(userId, ids);

    console.log(`Fetched ${supabseTemplates.length} workout templates for user ${userId}`);

    return supabseTemplates;
  }
}
