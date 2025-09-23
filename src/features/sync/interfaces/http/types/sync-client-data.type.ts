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
  exercise_id: string;
  body_part_id: string;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

export interface Exercise {
  id: string;
  name: string;
  user_id?: string;
  description: string;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

export interface SetIntensity {
  set_id: string;
  intensity_id: string;
  intensity_level?: number;
  failure: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

export interface Set {
  id: string;
  workout_exercise_id: string;
  template_set_id?: string;
  reps: number;
  weight: number;
  set_number: number;
  note?: string;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

export interface SetSetType {
  set_id: string;
  set_type_id: string;
  set_group: number;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

export interface TemplateExercise {
  id: string;
  template_id: string;
  exercise_id: string;
  order: number;
  set_up?: string;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

export interface TemplateExerciseType {
  template_exercise_id: string;
  exercise_type_id: string;
  exercise_group: number;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

export interface TemplateSet {
  id: string;
  template_exercise_id: string;
  set_number: number;
  low_reps?: number;
  high_reps?: number;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

export interface TemplateSetType {
  template_set_id: string;
  set_type_id: string;
  set_group: number;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserSubscription {
  id: string;
  user_id: string;
  entitlement_id: string;
  latest_purchase_at: string;
  expiration_at: string;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  will_renew: boolean;
  product_id?: string;
  store: "app_store" | "play_store" | "stripe" | "unknown";
  period_type: "trial" | "normal" | "unknown";
  management_url: string;
}

export interface WorkoutExercise {
  id: string;
  workout_id: string;
  exercise_id: string;
  order: number;
  set_up?: string;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

export interface WorkoutExerciseType {
  workout_exercise_id: string;
  exercise_type_id: string;
  exercise_group: number;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

export interface Workout {
  id: string;
  workout_template_id: string;
  duration: number;
  note?: string;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

export interface WorkoutTemplate {
  id: string;
  user_id: string;
  name: string;
  order: number;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  reordered_at: string;
}
