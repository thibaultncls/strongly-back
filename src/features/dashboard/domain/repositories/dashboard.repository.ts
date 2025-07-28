export interface WorkoutTemplate {
  id: number;
  name: string;
  updated_at: string; // ISO 8601 format
  order: number;
  exercises: {
    id: number;
    updated_at: string; // ISO 8601 format
    name: string;
    setNumber: number;
    sets: {
      id: number;
      updated_at: string; // ISO 8601 format
    };
  }[];
}

export interface DashboardRepository {
  getWorkoutTemplates(userId: string): Promise<WorkoutTemplate[]>;
}
