import type { SyncRepository } from "@features/sync/domain/repositories/sync.repository.js";
import type { SyncClientData } from "@features/sync/interfaces/http/types/sync-client-data.type.js";

export class SyncClientDataUseCase {
  constructor(private syncRepository: SyncRepository) {}

  async execute(data: SyncClientData) {
    if (data.exercise && data.exercise.length > 0) {
      const exercisesId = data.exercise.map((exercise) => exercise.id);
      const exercisesToSync = await this.syncRepository.checkExercisesToSync(exercisesId);

      for (const exercise of data.exercise) {
        // Convert the updated_at string to a Date object
        const clientUpdatedAt = new Date(exercise.updated_at);
        // Check if the exercise exists in the database and if it needs to be updated
        const exerciseToSync = exercisesToSync.find((ex) => ex.id === exercise.id);
        if (!exerciseToSync && !exercise.is_deleted) {
          // Add the exercise to the database
        } else if (exerciseToSync && clientUpdatedAt > exerciseToSync.updated_at) {
          // Update the existing exercise in the database
        } else if (exercise.is_deleted) {
          // Mark the exercise as deleted in the database
        }
      }
    }
  }
}
