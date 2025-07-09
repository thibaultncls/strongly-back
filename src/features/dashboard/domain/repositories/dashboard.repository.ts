export interface WorkoutTemplate {
  id: string;
  name: string;
  order: number;
  exercises: {
    name: string;
    setNumber: number;
  }[];
}

export interface DashboardRepository {
  getWorkoutTemplates(userId: string): Promise<any[]>;
}
