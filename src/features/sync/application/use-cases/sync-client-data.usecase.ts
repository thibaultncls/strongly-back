import type { SyncRepository } from "@features/sync/domain/repositories/sync.repository.js";
import type { SyncClientData } from "@features/sync/interfaces/http/types/sync-client-data.type.js";

export class SyncClientDataUseCase {
  constructor(private syncRepository: SyncRepository) {}

  async execute(data: SyncClientData) {
    if (data.exercise && data.exercise.length > 0) {
      const exercisesId = data.exercise.map((exercise) => exercise.id);
      const exercisesToSync = await this.syncRepository.checkExercisesToSync(exercisesId);

      for (const exercise of data.exercise) {
        const exerciseToSync = exercisesToSync.find((ex) => ex.id === exercise.id);
        if (!exerciseToSync && !exercise.is_deleted) {
          // Add the exercise to the database
        } else if (exerciseToSync && exercise.updated_at > exerciseToSync.updated_at) {
          // Update the existing exercise in the database
        } else if (exercise.is_deleted) {
          // Mark the exercise as deleted in the database
        }
      }
    }
  }
}
