import z, { nullable } from "zod";

const ExerciseBodyPartSchema = z.object({
  exercise_id: z.string(),
  body_part_id: z.string(),
  is_deleted: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});

const ExerciseSchema = z.object({
  id: z.string(),
  name: z.string(),
  user_id: z.string().nullable(),
  description: z.string(),
  is_deleted: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});

const SetIntensitySchema = z.object({
  set_id: z.string(),
  intensity_id: z.string(),
  intensity_level: z.number().nullable(),
  failure: z.boolean(),
  is_deleted: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});

const SetSchema = z.object({
  id: z.string(),
  workout_exercise_id: z.string(),
  reps: z.number(),
  weight: z.number(),
  set_number: z.number(),
  note: z.string().nullable(),
  is_deleted: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});

const SetSetTypeSchema = z.object({
  set_id: z.string(),
  set_type_id: z.string(),
  set_group: z.number(),
  is_deleted: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});

const TemplateExerciseSchema = z.object({
  id: z.string(),
  template_id: z.string(),
  exercise_id: z.string(),
  order: z.number(),
  set_up: z.string().nullable(),
});

const TemplateExerciseTypeSchema = z.object({
  template_exercise_id: z.string(),
  exercise_type_id: z.string(),
  exercise_group: z.number(),
  is_deleted: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});

const TemplateSetSchema = z.object({
  id: z.string(),
  template_exercise_id: z.string(),
  set_number: z.number(),
  low_reps: z.number().nullable(),
  high_reps: z.number().nullable(),
  is_deleted: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});

const TemplateSetTypeSchema = z.object({
  template_set_id: z.string(),
  set_type_id: z.string(),
  set_group: z.number(),
  is_deleted: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});

const UserSubscriptionSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  entitlement_id: z.string(),
  latestPurchaseAt: z.string().nullable(),
  expiration_at: z.string().nullable(),
  is_deleted: z.boolean(),
  is_active: z.boolean(),
  will_renew: z.boolean(),
  product_id: z.string().nullable(),
  store: z.enum(["app_store", "play_store", "stripe", "unknown"]),
  period_type: z.enum(["normal", "introductory", "trial", "unknown"]),
  management_url: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

const WorkoutExerciseSchema = z.object({
  id: z.string(),
  workout_id: z.string(),
  exercise_id: z.string(),
  order: z.number(),
  set_up: z.string().nullable(),
  is_deleted: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});

const WorkoutExerciseTypeSchema = z.object({
  workout_exercise_id: z.string(),
  exercise_type_id: z.string(),
  exercise_group: z.number(),
  is_deleted: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});

const WorkoutSchema = z.object({
  id: z.string(),
  workout_template_id: z.string(),
  duration: z.int(),
  note: z.string().nullable(),
  is_deleted: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});

const WorkoutTemplateSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  name: z.string(),
  order: z.number(),
  is_deleted: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const SyncClientDataSchema = z.object({
  exercise_body_part: z.array(ExerciseBodyPartSchema).optional(),
  exercise: z.array(ExerciseSchema).optional(),
  set: z.array(SetSchema).optional(),
  set_intensity: z.array(SetIntensitySchema).optional(),
  set_set_type: z.array(SetSetTypeSchema).optional(),
  template_exercise: z.array(TemplateExerciseSchema).optional(),
  template_exercise_type: z.array(TemplateExerciseTypeSchema).optional(),
  template_set: z.array(TemplateSetSchema).optional(),
  template_set_type: z.array(TemplateSetTypeSchema).optional(),
  user_subscription: z.array(UserSubscriptionSchema).optional(),
  workout_exercise: z.array(WorkoutExerciseSchema).optional(),
  workout_exercise_type: z.array(WorkoutExerciseTypeSchema).optional(),
  workout: z.array(WorkoutSchema).optional(),
  workout_template: z.array(WorkoutTemplateSchema).optional(),
});
