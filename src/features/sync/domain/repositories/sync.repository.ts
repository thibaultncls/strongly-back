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
  checkExercisesToSync(exercisesIds: string[]): Promise<IdAndUpdatedAt[]>; // Placeholder for checking exercises to sync
  syncExercises(remoteIdAndUpdatedAt: IdAndUpdatedAt[], data: Exercise[]): Promise<void>;

  // Sync methods for exercise body parts
  checkExerciseBodyPartsToSync(exerciseIds: string[], bodyPartIds: string[]): Promise<ExerciseBodyPartIds[]>;
  syncExerciseBodyParts(remoteIdAndUpdatedAt: ExerciseBodyPartIds[], data: ExerciseBodyPart[]): Promise<void>;

  // Sync methods for workout templates
  checkWorkoutTemplatesToSync(workoutTemplateIds: string[]): Promise<IdUpdateAtAndReorderedAt[]>;
  syncWorkoutTemplates(remoteIdAndUpdatedAt: IdUpdateAtAndReorderedAt[], data: WorkoutTemplate[]): Promise<void>;

  // Sync methods for template exercises
  checkTemplateExercisesToSync(templateExerciseIds: string[]): Promise<IdAndUpdatedAt[]>;
  syncTemplateExercises(remoteIdAndUpdatedAt: IdAndUpdatedAt[], data: TemplateExercise[]): Promise<void>;

  // Sync methods for template sets
  checkTemplateSetsToSync(templateSetIds: string[]): Promise<IdAndUpdatedAt[]>;
  syncTemplateSets(remoteIdAndUpdatedAt: IdAndUpdatedAt[], data: TemplateSet[]): Promise<void>;

  // Sync methods for workouts
  checkWorkoutsToSync(workoutIds: string[]): Promise<IdAndUpdatedAt[]>;
  syncWorkouts(remoteIdAndUpdatedAt: IdAndUpdatedAt[], data: Workout[]): Promise<void>;

  // Sync methods for workout exercises
  checkWorkoutExercisesToSync(workoutExerciseIds: string[]): Promise<IdAndUpdatedAt[]>;
  syncWorkoutExercises(remoteIdAndUpdatedAt: IdAndUpdatedAt[], data: WorkoutExercise[]): Promise<void>;

  // Sync methods for sets
  checkSetsToSync(setIds: string[]): Promise<IdAndUpdatedAt[]>;
  syncSets(remoteIdAndUpdatedAt: IdAndUpdatedAt[], data: Set[]): Promise<void>;

  // Sync methods for set intensities
  checkSetIntensitiesToSync(setIds: string[], intensityIds: string[]): Promise<SetIntensityIds[]>;
  syncSetIntensities(remoteIdAndUpdatedAt: SetIntensityIds[], data: SetIntensity[]): Promise<void>;

  // Sync methods for set set types
  checkSetSetTypesToSync(setIds: string[], setTypeIds: string[]): Promise<SetSetTypeIds[]>;
  syncSetSetTypes(remoteIdAndUpdatedAt: SetSetTypeIds[], data: SetSetType[]): Promise<void>;

  // Sync methods for template exercise types
  checkTemplateExerciseTypesToSync(templateExerciseIds: string[], exerciseTypeIds: string[]): Promise<TemplateExerciseTypeIds[]>;
  syncTemplateExerciseTypes(remoteIdAndUpdatedAt: TemplateExerciseTypeIds[], data: TemplateExerciseType[]): Promise<void>;

  // Sync methods for template set types
  checkTemplateSetTypesToSync(templateSetIds: string[], setTypeIds: string[]): Promise<TemplateSetTypeIds[]>;
  syncTemplateSetTypes(remoteIdAndUpdatedAt: TemplateSetTypeIds[], data: TemplateSetType[]): Promise<void>;

  // Sync methods for user subscriptions
  checkUserSubscriptionsToSync(ids: string[], userIds: string[], subscriptionIds: string[]): Promise<UserSubscriptionIds[]>;
  syncUserSubscriptions(remoteIdAndUpdatedAt: UserSubscriptionIds[], data: UserSubscription[]): Promise<void>;

  // Sync methods for workout exercise types
  checkWorkoutExerciseTypesToSync(workoutExerciseIds: string[], exerciseTypeIds: string[]): Promise<WorkoutExerciseTypeIds[]>;
  syncWorkoutExerciseTypes(remoteIdAndUpdatedAt: WorkoutExerciseTypeIds[], data: WorkoutExerciseType[]): Promise<void>;
}

export interface IdAndUpdatedAt {
  id: string;
  updated_at: Date;
}

export interface IdUpdateAtAndReorderedAt {
  id: string;
  updated_at: Date;
  reordered_at: Date;
}

export interface SetIntensityIds {
  set_id: string;
  intensity_id: string;
  updated_at: Date;
}

export interface SetSetTypeIds {
  set_id: string;
  set_type_id: string;
  updated_at: Date;
}

export interface TemplateExerciseTypeIds {
  template_exercise_id: string;
  exercise_type_id: string;
  updated_at: Date;
}

export interface TemplateSetTypeIds {
  template_set_id: string;
  set_type_id: string;
  updated_at: Date;
}

export interface UserSubscriptionIds {
  id: string;
  user_id: string;
  subscription_id: string;
  updated_at: Date;
}

export interface ExerciseBodyPartIds {
  exercise_id: string;
  body_part_id: string;
  updated_at: Date;
}

export interface WorkoutExerciseTypeIds {
  workout_exercise_id: string;
  exercise_type_id: string;
  updated_at: Date;
}
