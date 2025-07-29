import type {
  Exercise,
  ExerciseBodyPart,
  Set,
  SetIntensity,
  SetSetType,
  TemplateExercise,
  TemplateExerciseType,
  TemplateSet,
  TemplateSetType,
  UserSubscription,
  Workout,
  WorkoutExercise,
  WorkoutExerciseType,
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

  // Sync methods for exercise body parts
  checkExerciseBodyPartsToSync(exerciseIds: number[], bodyPartIds: number[]): Promise<ExerciseBodyPartIds[]>;
  syncExerciseBodyParts(remoteIdAndUpdatedAt: ExerciseBodyPartIds[], data: ExerciseBodyPart[]): Promise<void>;

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

  // Sync methods for workout exercises
  checkWorkoutExercisesToSync(workoutExerciseIds: number[]): Promise<IdAndUpdatedAt[]>;
  syncWorkoutExercises(remoteIdAndUpdatedAt: IdAndUpdatedAt[], data: WorkoutExercise[]): Promise<void>;

  // Sync methods for sets
  checkSetsToSync(setIds: number[]): Promise<IdAndUpdatedAt[]>;
  syncSets(remoteIdAndUpdatedAt: IdAndUpdatedAt[], data: Set[]): Promise<void>;

  // Sync methods for set intensities
  checkSetIntensitiesToSync(setIds: number[], intensityIds: number[]): Promise<SetIntensityIds[]>;
  syncSetIntensities(remoteIdAndUpdatedAt: SetIntensityIds[], data: SetIntensity[]): Promise<void>;

  // Sync methods for set set types
  checkSetSetTypesToSync(setIds: number[], setTypeIds: number[]): Promise<SetSetTypeIds[]>;
  syncSetSetTypes(remoteIdAndUpdatedAt: SetSetTypeIds[], data: SetSetType[]): Promise<void>;

  // Sync methods for template exercise types
  checkTemplateExerciseTypesToSync(templateExerciseIds: number[], exerciseTypeIds: number[]): Promise<TemplateExerciseTypeIds[]>;
  syncTemplateExerciseTypes(remoteIdAndUpdatedAt: TemplateExerciseTypeIds[], data: TemplateExerciseType[]): Promise<void>;

  // Sync methods for template set types
  checkTemplateSetTypesToSync(templateSetIds: number[], setTypeIds: number[]): Promise<TemplateSetTypeIds[]>;
  syncTemplateSetTypes(remoteIdAndUpdatedAt: TemplateSetTypeIds[], data: TemplateSetType[]): Promise<void>;

  // Sync methods for user subscriptions
  checkUserSubscriptionsToSync(ids: number[], userIds: string[], subscriptionIds: number[]): Promise<UserSubscriptionIds[]>;
  syncUserSubscriptions(remoteIdAndUpdatedAt: UserSubscriptionIds[], data: UserSubscription[]): Promise<void>;

  // Sync methods for workout exercise types
  checkWorkoutExerciseTypesToSync(workoutExerciseIds: number[], exerciseTypeIds: number[]): Promise<WorkoutExerciseTypeIds[]>;
  syncWorkoutExerciseTypes(remoteIdAndUpdatedAt: WorkoutExerciseTypeIds[], data: WorkoutExerciseType[]): Promise<void>;
}

export interface IdAndUpdatedAt {
  id: number;
  updated_at: Date;
}

export interface SetIntensityIds {
  set_id: number;
  intensity_id: number;
  updated_at: Date;
}

export interface SetSetTypeIds {
  set_id: number;
  set_type_id: number;
  updated_at: Date;
}

export interface TemplateExerciseTypeIds {
  template_exercise_id: number;
  exercise_type_id: number;
  updated_at: Date;
}

export interface TemplateSetTypeIds {
  template_set_id: number;
  set_type_id: number;
  updated_at: Date;
}

export interface UserSubscriptionIds {
  id: number;
  user_id: string;
  subscription_id: number;
  updated_at: Date;
}

export interface ExerciseBodyPartIds {
  exercise_id: number;
  body_part_id: number;
  updated_at: Date;
}

export interface WorkoutExerciseTypeIds {
  workout_exercise_id: number;
  exercise_type_id: number;
  updated_at: Date;
}
