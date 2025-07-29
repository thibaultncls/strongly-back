import type {
  Exercise,
  TemplateExercise,
  TemplateSet,
  Workout,
  WorkoutTemplate,
} from "@features/sync/interfaces/http/types/sync-client-data.type.js";

export interface SyncRepository {
  /**
   * Checks if a user with the specified user ID has the given device ID.
   *
   * @param userId - The ID of the user to check
   * @param deviceId - The device ID to verify
   * @returns A promise that resolves to a boolean indicating whether the user has the specified device ID
   * @throws {RequestError} If there's an error during the database query
   */
  checkUserDeviceId(userId: string, deviceId: string): Promise<boolean>;
  getNonSyncData(userId: string, lastSync: string): Promise<any>; // Placeholder for non-sync data method
  updateUserDeviceId(userId: string, deviceId: string): Promise<void>; // Placeholder for updating user device ID

  // Sync methods for exercises
  checkExercisesToSync(exercisesIds: number[]): Promise<IdAndUpdatedAt[]>; // Placeholder for checking exercises to sync
  syncExercises(remoteIdAndUpdatedAt: IdAndUpdatedAt[], data: Exercise[]): Promise<void>;

  // Sync methods for workout templates
  checkWorkoutTemplatesToSync(workoutTemplateIds: number[]): Promise<IdAndUpdatedAt[]>;
  syncWorkoutTemplates(remoteIdAndUpdatedAt: IdAndUpdatedAt[], data: WorkoutTemplate[]): Promise<void>;

  // Sync methods for template exercises
  checkTemplateExercisesToSync(templateExerciseIds: number[]): Promise<IdAndUpdatedAt[]>;
  syncTemplateExercises(remoteIdAndUpdatedAt: IdAndUpdatedAt[], data: TemplateExercise[]): Promise<void>;

  // Sync methods for template sets
  checkTemplateSetsToSync(templateSetIds: number[]): Promise<IdAndUpdatedAt[]>;
  syncTemplateSets(remoteIdAndUpdatedAt: IdAndUpdatedAt[], data: TemplateSet[]): Promise<void>;

  // Sync methods for workouts
  checkWorkoutsToSync(workoutIds: number[]): Promise<IdAndUpdatedAt[]>;
  syncWorkouts(remoteIdAndUpdatedAt: IdAndUpdatedAt[], data: Workout[]): Promise<void>;
}

export interface IdAndUpdatedAt {
  id: number;
  updated_at: Date;
}
