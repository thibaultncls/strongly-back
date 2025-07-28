import z from "zod";

const ExerciseBodyPartSchema = z.object({
  exercise_id: z.number(),
  body_part_id: z.number(),
  is_deleted: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});

const ExerciseSchema = z.object({
  id: z.number(),
  name: z.string(),
  user_id: z.string().optional(),
  description: z.string(),
  is_deleted: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});

const SetIntensitySchema = z.object({
  set_id: z.number(),
  intensity_id: z.number(),
  intensity_level: z.number().optional(),
  failure: z.boolean(),
  is_deleted: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});

const SetSchema = z.object({
  id: z.number(),
  workout_exercise_id: z.number(),
  reps: z.number(),
  weight: z.number(),
  set_number: z.number(),
  note: z.string().optional(),
  is_deleted: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});

const SetSetTypeSchema = z.object({
  set_id: z.number(),
  set_type_id: z.number(),
  set_group: z.number(),
  is_deleted: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});

const TemplateExerciseSchema = z.object({
  id: z.number(),
  template_id: z.number(),
  exercise_id: z.number(),
  order: z.number(),
  set_up: z.string().optional(),
});

const TemplateExerciseTypeSchema = z.object({
  template_exercise_id: z.number(),
  exercise_type_id: z.number(),
  exercise_group: z.number(),
  is_deleted: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});

const TemplateSetSchema = z.object({
  id: z.number(),
  template_exercise_id: z.number(),
  set_number: z.number(),
  low_reps: z.number().optional(),
  high_reps: z.number().optional(),
  is_deleted: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});

const TemplateSetTypeSchema = z.object({
  template_set_id: z.number(),
  set_type_id: z.number(),
  set_group: z.number(),
  is_deleted: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});

const UserSubscriptionSchema = z.object({
  id: z.number(),
  user_id: z.string(),
  subscription_id: z.number(),
  beginning_date: z.string(),
  end_date: z.string(),
  is_active: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});

const WorkoutExerciseSchema = z.object({
  id: z.number(),
  workout_id: z.number(),
  exercise_id: z.number(),
  order: z.number(),
  set_up: z.string().optional(),
  is_deleted: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});

const WorkoutExerciseTypeSchema = z.object({
  workout_exercise_id: z.number(),
  exercise_type_id: z.number(),
  exercise_group: z.number(),
  is_deleted: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});

const WorkoutSchema = z.object({
  id: z.number(),
  workout_template_id: z.number(),
  duration: z.string(),
  note: z.string().optional(),
  is_deleted: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});

const WorkoutTemplateSchema = z.object({
  id: z.number(),
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
