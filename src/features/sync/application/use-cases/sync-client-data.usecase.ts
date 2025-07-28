import type { SyncRepository } from "@features/sync/domain/repositories/sync.repository.js";
import type { SyncClientData } from "@features/sync/interfaces/http/types/sync-client-data.type.js";

export class SyncClientDataUseCase {
  constructor(private syncRepository: SyncRepository) {}

  async execute(data: SyncClientData) {
    // Handle Exercises
    if (data.exercise && data.exercise.length > 0) {
      const exercisesId = data.exercise.map((exercise) => exercise.id);
      const exercisesToSync = await this.syncRepository.checkExercisesToSync(exercisesId);
      await this.syncRepository.syncExercises(exercisesToSync, data.exercise);
    }
  }
}
