export interface WorkoutTemplate {
  id: string;
  name: string;
  order: number;
  exercises: {
    name: string;
    setNumber: number;
  }[];
}

export interface WorkoutTemplateUpdate {
  workout_id: string;
  workout_update: string; // ISO 8601 timestamp
  exercises: {
    exercise_id: string;
    exercise_update: string; // ISO 8601 timestamp
    sets: {
      set_id: string;
      set_update: string; // ISO 8601 timestamp
    }[];
  }[];
}

export interface DashboardRepository {
  getTemplateUpdates(userId: string): Promise<WorkoutTemplateUpdate[]>;
  getWorkoutTemplates(userId: string): Promise<WorkoutTemplate[]>;
}
