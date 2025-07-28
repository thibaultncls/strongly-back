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
  checkExercisesToSync(exercisesIds: number[]): Promise<IdAndUpdatedAt[]>; // Placeholder for checking exercises to sync
}

export interface IdAndUpdatedAt {
  id: number;
  updated_at: string;
}
