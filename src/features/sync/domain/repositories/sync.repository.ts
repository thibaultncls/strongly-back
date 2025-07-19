import type { SyncWorkoutTemplate } from "@features/sync/interfaces/http/types/sync-workout-template.type.js";

export interface SyncRepository {
  getWorkoutTemplatesToSync(userId: string, ids: number[]): Promise<any[]>;
  getWorkoutTemplates(userId: string, lastSync: string): Promise<SyncWorkoutTemplate[]>;
}
