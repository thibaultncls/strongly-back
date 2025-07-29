import type { SyncRepository } from "@features/sync/domain/repositories/sync.repository.js";
import type { SyncClientData } from "@features/sync/interfaces/http/types/sync-client-data.type.js";
import { InvalidArgumentsError } from "@shared/errors/InvalidArgumentsError.js";
import { da } from "zod/locales";

export class SyncClientDataUseCase {
  constructor(private syncRepository: SyncRepository) {}

  async execute(data: SyncClientData) {
    if (!data || Object.keys(data).length === 0) {
      throw new InvalidArgumentsError("No data to sync");
    }

    // Handle Exercises
    if (data.exercise && data.exercise.length > 0) {
      const exercisesId = data.exercise.map((exercise) => exercise.id);
      const exercisesToSync = await this.syncRepository.checkExercisesToSync(exercisesId);
      await this.syncRepository.syncExercises(exercisesToSync, data.exercise);
    }

    // Handle Workout Templates
    if (data.workout_template && data.workout_template.length > 0) {
      const workoutTemplatesId = data.workout_template.map((template) => template.id);
      const workoutTemplatesToSync = await this.syncRepository.checkWorkoutTemplatesToSync(workoutTemplatesId);
      await this.syncRepository.syncWorkoutTemplates(workoutTemplatesToSync, data.workout_template);
    }
  }
}
