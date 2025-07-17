export type SyncWorkoutTemplate = {
  id: number;
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    created_at: string;
    updated_at: string;
  };
  created_at: string;
  updated_at: string;
  name: string;
  order: number;
  exercises: {
    id: number;
    order: number;
    updated_at: string;
    created_at: string;
    set_up?: string | null;
    exercise: {
      id: number;
      name: string;
      description?: string | null;
      user_id?: string | null;
      created_at: string;
      updated_at: string;
    };
    sets: {
      id: number;
      low_reps?: number | null;
      high_reps?: number | null;
      set_number: number;
      created_at: string;
      updated_at: string;
    }[];
  }[];
};
