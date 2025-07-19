import type { SyncWorkoutTemplate } from "@features/sync/interfaces/http/types/sync-workout-template.type.js";

export interface SyncRepository {
  syncWorkoutTemplates(userId: string, templates: SyncWorkoutTemplate[]): Promise<void>;
  getWorkoutTemplates(userId: string, lastSync: string): Promise<SyncWorkoutTemplate[]>;
}
