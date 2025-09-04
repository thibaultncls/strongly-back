export interface SyncClientData {
  exercise_body_part?: ExerciseBodyPart[];
  exercise?: Exercise[];
  set?: Set[];
  set_intensity?: SetIntensity[];
  set_set_type?: SetSetType[];
  template_exercise?: TemplateExercise[];
  template_exercise_type?: TemplateExerciseType[];
  template_set?: TemplateSet[];
  template_set_type?: TemplateSetType[];
  user_subscription?: UserSubscription[];
  workout_exercise?: WorkoutExercise[];
  workout_exercise_type?: WorkoutExerciseType[];
  workout?: Workout[];
  workout_template?: WorkoutTemplate[];
}

export interface ExerciseBodyPart {
  exercise_id: number;
  body_part_id: number;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

export interface Exercise {
  id: number;
  name: string;
  user_id?: string;
  description: string;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

export interface SetIntensity {
  set_id: number;
  intensity_id: number;
  intensity_level?: number;
  failure: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

export interface Set {
  id: number;
  workout_exercise_id: number;
  template_set_id?: number;
  reps: number;
  weight: number;
  set_number: number;
  note?: string;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

export interface SetSetType {
  set_id: number;
  set_type_id: number;
  set_group: number;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

export interface TemplateExercise {
  id: number;
  template_id: number;
  exercise_id: number;
  order: number;
  set_up?: string;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

export interface TemplateExerciseType {
  template_exercise_id: number;
  exercise_type_id: number;
  exercise_group: number;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

export interface TemplateSet {
  id: number;
  template_exercise_id: number;
  set_number: number;
  low_reps?: number;
  high_reps?: number;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

export interface TemplateSetType {
  template_set_id: number;
  set_type_id: number;
  set_group: number;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserSubscription {
  id: number;
  user_id: string;
  subscription_id: number;
  beginning_date: string;
  end_date: string;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

export interface WorkoutExercise {
  id: number;
  workout_id: number;
  exercise_id: number;
  order: number;
  set_up?: string;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

export interface WorkoutExerciseType {
  workout_exercise_id: number;
  exercise_type_id: number;
  exercise_group: number;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

export interface Workout {
  id: number;
  workout_template_id: number;
  duration: number;
  note?: string;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

export interface WorkoutTemplate {
  id: number;
  user_id: string;
  name: string;
  order: number;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}
