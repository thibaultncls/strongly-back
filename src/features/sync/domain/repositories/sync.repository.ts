import type { SyncWorkoutTemplate } from "@features/sync/interfaces/http/types/sync-workout-template.type.js";

export interface SyncRepository {
  getWorkoutTemplatesToSync(userId: string, ids: number[]): Promise<WorkoutTemplatesFromSupabase[]>;
  getWorkoutTemplates(userId: string, lastSync: string): Promise<SyncWorkoutTemplate[]>;
  checkUserDeviceId(userId: string, deviceId: string): Promise<boolean>;
  getNonSyncData(userId: string, lastSync: string): Promise<any>; // Placeholder for non-sync data method
}

export interface WorkoutTemplatesFromSupabase {
  id: number;
  user_id: string;
  created_at: string;
  updated_at: string;
  name: string;
  order: number;
  is_deleted: boolean;
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    created_at: string;
    updated_at: string;
    is_deleted: boolean;
  };
  template_exercise: {
    id: number;
    order: number;
    set_up?: string | null;
    created_at: string;
    updated_at: string;
    is_deleted: boolean;
    exercise_id: number;
    template_id: number;
    exercise: {
      id: number;
      name: string;
      description?: string | null;
      user_id?: string | null;
      created_at: string;
      updated_at: string;
      is_deleted: boolean;
    };
    template_set: {
      id: number;
      low_rep?: number | null;
      high_rep?: number | null;
      set_number: number;
      created_at: string;
      updated_at: string;
      is_deleted: boolean;
      template_exercise_id: number;
    }[];
  }[];
}
