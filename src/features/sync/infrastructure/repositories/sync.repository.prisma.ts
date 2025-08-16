import { prisma } from "@config/prisma.js";
import type {
  ExerciseBodyPartIds,
  IdAndUpdatedAt,
  SetIntensityIds,
  SetSetTypeIds,
  SyncRepository,
  TemplateExerciseTypeIds,
  TemplateSetTypeIds,
  UserSubscriptionIds,
  WorkoutExerciseTypeIds,
} from "@features/sync/domain/repositories/sync.repository.js";
import type {
  Exercise,
  ExerciseBodyPart,
  Set,
  SetIntensity,
  SetSetType,
  TemplateExercise,
  TemplateExerciseType,
  TemplateSet,
  TemplateSetType,
  UserSubscription,
  Workout,
  WorkoutExercise,
  WorkoutExerciseType,
  WorkoutTemplate,
} from "@features/sync/interfaces/http/types/sync-client-data.type.js";
import { Prisma } from "@prisma/client";
import { RequestError } from "@shared/errors/RequestError.js";

export class SyncRepositoryPrisma implements SyncRepository {
  async checkWorkoutExerciseTypesToSync(workoutExerciseIds: number[], exerciseTypeIds: number[]): Promise<WorkoutExerciseTypeIds[]> {
    try {
      const workoutExerciseTypes = await prisma.workout_exercise_type.findMany({
        where: { workout_exercise_id: { in: workoutExerciseIds }, exercise_type_id: { in: exerciseTypeIds } },
        select: { workout_exercise_id: true, exercise_type_id: true, updated_at: true },
      });

      return workoutExerciseTypes.map((workoutExerciseType) => ({
        workout_exercise_id: Number(workoutExerciseType.workout_exercise_id),
        exercise_type_id: Number(workoutExerciseType.exercise_type_id),
        updated_at: workoutExerciseType.updated_at,
      }));
    } catch (error: any) {
      console.error("Error checking workout exercise types to sync:", error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new RequestError(`Failed to check workout exercise types: ${error.message}`);
      }
      throw new RequestError("Failed to check workout exercise types");
    }
  }

  async syncWorkoutExerciseTypes(remoteIdAndUpdatedAt: WorkoutExerciseTypeIds[], data: WorkoutExerciseType[]): Promise<void> {
    try {
      const operations = [];

      for (const workoutExerciseType of data) {
        const remoteWorkoutExerciseType = remoteIdAndUpdatedAt.find(
          (item) =>
            item.workout_exercise_id === workoutExerciseType.workout_exercise_id &&
            item.exercise_type_id === workoutExerciseType.exercise_type_id
        );
        const clientUpdatedAt = new Date(workoutExerciseType.updated_at);

        if (!remoteWorkoutExerciseType && !workoutExerciseType.is_deleted) {
          // Create
          operations.push(
            prisma.workout_exercise_type.create({
              data: {
                workout_exercise_id: workoutExerciseType.workout_exercise_id,
                exercise_type_id: workoutExerciseType.exercise_type_id,
                exercise_group: workoutExerciseType.exercise_group,
                is_deleted: workoutExerciseType.is_deleted,
                created_at: new Date(workoutExerciseType.created_at),
                updated_at: clientUpdatedAt,
              },
            })
          );
        } else if (remoteWorkoutExerciseType && clientUpdatedAt > remoteWorkoutExerciseType.updated_at && !workoutExerciseType.is_deleted) {
          // Update
          operations.push(
            prisma.workout_exercise_type.update({
              where: {
                workout_exercise_id_exercise_type_id: {
                  workout_exercise_id: workoutExerciseType.workout_exercise_id,
                  exercise_type_id: workoutExerciseType.exercise_type_id,
                },
              },
              data: {
                exercise_group: workoutExerciseType.exercise_group,
                is_deleted: false,
                updated_at: clientUpdatedAt,
              },
            })
          );
        } else if (workoutExerciseType.is_deleted && remoteWorkoutExerciseType && clientUpdatedAt > remoteWorkoutExerciseType.updated_at) {
          // Soft delete if deletion is more recent
          operations.push(
            prisma.workout_exercise_type.update({
              where: {
                workout_exercise_id_exercise_type_id: {
                  workout_exercise_id: workoutExerciseType.workout_exercise_id,
                  exercise_type_id: workoutExerciseType.exercise_type_id,
                },
              },
              data: {
                is_deleted: true,
                updated_at: clientUpdatedAt,
              },
            })
          );
        }
      }
    } catch (error: any) {
      console.error("Error syncing workout exercise types:", error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new RequestError(`Failed to sync workout exercise types: ${error.message}`);
      }
      throw new RequestError("Failed to sync workout exercise types");
    }
  }

  async checkExerciseBodyPartsToSync(exerciseIds: number[], bodyPartIds: number[]): Promise<ExerciseBodyPartIds[]> {
    try {
      const exerciseBodyParts = await prisma.exercise_body_part.findMany({
        where: {
          exercise_id: { in: exerciseIds },
          body_part_id: { in: bodyPartIds },
        },
        select: { exercise_id: true, body_part_id: true, updated_at: true },
      });

      return exerciseBodyParts.map((exerciseBodyPart) => ({
        exercise_id: Number(exerciseBodyPart.exercise_id),
        body_part_id: Number(exerciseBodyPart.body_part_id),
        updated_at: exerciseBodyPart.updated_at,
      }));
    } catch (error: any) {
      console.error("Error checking exercise body parts to sync:", error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new RequestError(`Failed to check exercise body parts: ${error.message}`);
      }
      throw new RequestError("Failed to check exercise body parts");
    }
  }

  async syncExerciseBodyParts(remoteIdAndUpdatedAt: ExerciseBodyPartIds[], data: ExerciseBodyPart[]): Promise<void> {
    try {
      const operations = [];

      for (const exerciseBodyPart of data) {
        const remoteExerciseBodyPart = remoteIdAndUpdatedAt.find(
          (item) => item.exercise_id === exerciseBodyPart.exercise_id && item.body_part_id === exerciseBodyPart.body_part_id
        );
        const clientUpdatedAt = new Date(exerciseBodyPart.updated_at);

        if (!remoteExerciseBodyPart && !exerciseBodyPart.is_deleted) {
          // Create
          operations.push(
            prisma.exercise_body_part.create({
              data: {
                exercise_id: exerciseBodyPart.exercise_id,
                body_part_id: exerciseBodyPart.body_part_id,
                created_at: new Date(exerciseBodyPart.created_at),
                updated_at: clientUpdatedAt,
                is_deleted: exerciseBodyPart.is_deleted,
              },
            })
          );
        } else if (remoteExerciseBodyPart && clientUpdatedAt > remoteExerciseBodyPart.updated_at && !exerciseBodyPart.is_deleted) {
          // Update
          operations.push(
            prisma.exercise_body_part.update({
              where: {
                exercise_id_body_part_id: {
                  exercise_id: exerciseBodyPart.exercise_id,
                  body_part_id: exerciseBodyPart.body_part_id,
                },
              },
              data: {
                updated_at: clientUpdatedAt,
                is_deleted: false,
              },
            })
          );
        } else if (exerciseBodyPart.is_deleted && remoteExerciseBodyPart && clientUpdatedAt > remoteExerciseBodyPart.updated_at) {
          // Soft delete if deletion is more recent
          operations.push(
            prisma.exercise_body_part.update({
              where: {
                exercise_id_body_part_id: {
                  exercise_id: exerciseBodyPart.exercise_id,
                  body_part_id: exerciseBodyPart.body_part_id,
                },
              },
              data: {
                is_deleted: true,
                updated_at: clientUpdatedAt,
              },
            })
          );
        }
      }

      await prisma.$transaction(operations);
    } catch (error: any) {
      console.error("Error syncing exercise body parts:", error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new RequestError(`Failed to sync exercise body parts: ${error.message}`);
      }
      throw new RequestError("Failed to sync exercise body parts");
    }
  }

  async checkUserSubscriptionsToSync(ids: number[], userIds: string[], subscriptionIds: number[]): Promise<UserSubscriptionIds[]> {
    try {
      const userSubscriptions = await prisma.user_subscription.findMany({
        where: {
          id: { in: ids },
          user_id: { in: userIds },
          subscription_id: { in: subscriptionIds },
        },
        select: { user_id: true, subscription_id: true, updated_at: true, id: true },
      });

      return userSubscriptions.map((userSubscription) => ({
        id: Number(userSubscription.id),
        user_id: userSubscription.user_id,
        subscription_id: Number(userSubscription.subscription_id),
        updated_at: userSubscription.updated_at,
      }));
    } catch (error: any) {
      console.error("Error checking user subscriptions to sync:", error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new RequestError(`Failed to check user subscriptions: ${error.message}`);
      }
      throw new RequestError("Failed to check user subscriptions");
    }
  }

  async syncUserSubscriptions(remoteIdAndUpdatedAt: UserSubscriptionIds[], data: UserSubscription[]): Promise<void> {
    try {
      const operations = [];

      for (const userSubscription of data) {
        const remoteUserSubscription = remoteIdAndUpdatedAt.find(
          (item) => item.user_id === userSubscription.user_id && item.subscription_id === userSubscription.subscription_id
        );
        const clientUpdatedAt = new Date(userSubscription.updated_at);

        if (!remoteUserSubscription && !userSubscription.is_deleted) {
          // Create
          operations.push(
            prisma.user_subscription.create({
              data: {
                id: userSubscription.id,
                beginning_date: new Date(userSubscription.beginning_date),
                end_date: new Date(userSubscription.end_date),
                user_id: userSubscription.user_id,
                subscription_id: userSubscription.subscription_id,
                is_deleted: userSubscription.is_deleted,
                created_at: new Date(userSubscription.created_at),
                updated_at: clientUpdatedAt,
              },
            })
          );
        } else if (remoteUserSubscription && clientUpdatedAt > remoteUserSubscription.updated_at && !userSubscription.is_deleted) {
          // Update
          operations.push(
            prisma.user_subscription.update({
              where: {
                id: remoteUserSubscription.id, // Assuming id is the primary key
              },
              data: {
                beginning_date: new Date(userSubscription.beginning_date),
                end_date: new Date(userSubscription.end_date),
                user_id: userSubscription.user_id,
                subscription_id: userSubscription.subscription_id,
                created_at: new Date(userSubscription.created_at),
                updated_at: clientUpdatedAt,
              },
            })
          );
        } else if (remoteUserSubscription && clientUpdatedAt > remoteUserSubscription.updated_at && !userSubscription.is_deleted) {
          // Update
          operations.push(
            prisma.user_subscription.update({
              where: {
                id: remoteUserSubscription.id, // Assuming id is the primary key
              },
              data: {
                beginning_date: new Date(userSubscription.beginning_date),
                end_date: new Date(userSubscription.end_date),
                user_id: userSubscription.user_id,
                subscription_id: userSubscription.subscription_id,
                created_at: new Date(userSubscription.created_at),
                updated_at: clientUpdatedAt,
              },
            })
          );
        }
      }

      await prisma.$transaction(operations);
    } catch (error: any) {
      console.error("Error syncing user subscriptions:", error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new RequestError(`Failed to sync user subscriptions: ${error.message}`);
      }
      throw new RequestError("Failed to sync user subscriptions");
    }
  }
  async checkTemplateSetTypesToSync(templateSetIds: number[], setTypeIds: number[]): Promise<TemplateSetTypeIds[]> {
    try {
      const templateSetTypes = await prisma.template_set_type.findMany({
        where: { template_set_id: { in: templateSetIds }, set_type_id: { in: setTypeIds } },
        select: { template_set_id: true, set_type_id: true, updated_at: true },
      });

      return templateSetTypes.map((templateSetType) => ({
        template_set_id: Number(templateSetType.template_set_id),
        set_type_id: Number(templateSetType.set_type_id),
        updated_at: templateSetType.updated_at,
      }));
    } catch (error: any) {
      console.error("Error checking template set types to sync:", error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new RequestError(`Failed to check template set types: ${error.message}`);
      }
      throw new RequestError("Failed to check template set types");
    }
  }

  async syncTemplateSetTypes(remoteIdAndUpdatedAt: TemplateSetTypeIds[], data: TemplateSetType[]): Promise<void> {
    try {
      const operations = [];

      for (const templateSetType of data) {
        const remoteTemplateSetType = remoteIdAndUpdatedAt.find(
          (item) => item.template_set_id === templateSetType.template_set_id && item.set_type_id === templateSetType.set_type_id
        );
        const clientUpdatedAt = new Date(templateSetType.updated_at);
        if (!remoteTemplateSetType && !templateSetType.is_deleted) {
          // Create
          operations.push(
            prisma.template_set_type.create({
              data: {
                template_set_id: templateSetType.template_set_id,
                set_type_id: templateSetType.set_type_id,
                set_group: templateSetType.set_group,
                is_deleted: templateSetType.is_deleted,
                created_at: new Date(templateSetType.created_at),
                updated_at: clientUpdatedAt,
              },
            })
          );
        } else if (remoteTemplateSetType && clientUpdatedAt > remoteTemplateSetType.updated_at && !templateSetType.is_deleted) {
          // Update
          operations.push(
            prisma.template_set_type.update({
              where: {
                template_set_id_set_type_id: {
                  template_set_id: templateSetType.template_set_id,
                  set_type_id: templateSetType.set_type_id,
                },
              },
              data: {
                set_group: templateSetType.set_group,
                updated_at: clientUpdatedAt,
                is_deleted: false,
              },
            })
          );
        } else if (templateSetType.is_deleted && remoteTemplateSetType) {
          // Soft delete
          operations.push(
            prisma.template_set_type.update({
              where: {
                template_set_id_set_type_id: {
                  template_set_id: templateSetType.template_set_id,
                  set_type_id: templateSetType.set_type_id,
                },
              },
              data: {
                is_deleted: true,
                updated_at: clientUpdatedAt,
              },
            })
          );
        }
      }

      await Promise.all(operations);
    } catch (error: any) {
      console.error("Error syncing template set types:", error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new RequestError(`Failed to sync template set types: ${error.message}`);
      }
      throw new RequestError("Failed to sync template set types");
    }
  }

  async checkTemplateExerciseTypesToSync(templateExerciseIds: number[], exerciseTypeIds: number[]): Promise<TemplateExerciseTypeIds[]> {
    try {
      const templateExerciseTypes = await prisma.template_exercise_type.findMany({
        where: { template_exercise_id: { in: templateExerciseIds }, exercise_type_id: { in: exerciseTypeIds } },
        select: { template_exercise_id: true, exercise_type_id: true, updated_at: true },
      });

      return templateExerciseTypes.map((templateExerciseType) => ({
        template_exercise_id: Number(templateExerciseType.template_exercise_id),
        exercise_type_id: Number(templateExerciseType.exercise_type_id),
        updated_at: templateExerciseType.updated_at,
      }));
    } catch (error: any) {
      console.error("Error checking template exercise types to sync:", error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new RequestError(`Failed to check template exercise types: ${error.message}`);
      }
      throw new RequestError("Failed to check template exercise types");
    }
  }

  async syncTemplateExerciseTypes(remoteIdAndUpdatedAt: TemplateExerciseTypeIds[], data: TemplateExerciseType[]): Promise<void> {
    try {
      const operations = [];

      for (const templateExerciseType of data) {
        const remoteTemplateExerciseType = remoteIdAndUpdatedAt.find(
          (item) =>
            item.template_exercise_id === templateExerciseType.template_exercise_id &&
            item.exercise_type_id === templateExerciseType.exercise_type_id
        );
        const clientUpdatedAt = new Date(templateExerciseType.updated_at);
        if (!remoteTemplateExerciseType && !templateExerciseType.is_deleted) {
          // Create
          operations.push(
            prisma.template_exercise_type.create({
              data: {
                template_exercise_id: templateExerciseType.template_exercise_id,
                exercise_type_id: templateExerciseType.exercise_type_id,
                exercise_group: templateExerciseType.exercise_group,
                is_deleted: templateExerciseType.is_deleted,
                created_at: new Date(templateExerciseType.created_at),
                updated_at: clientUpdatedAt,
              },
            })
          );
        } else if (
          remoteTemplateExerciseType &&
          clientUpdatedAt > remoteTemplateExerciseType.updated_at &&
          !templateExerciseType.is_deleted
        ) {
          // Update
          operations.push(
            prisma.template_exercise_type.update({
              where: {
                template_exercise_id_exercise_type_id: {
                  template_exercise_id: templateExerciseType.template_exercise_id,
                  exercise_type_id: templateExerciseType.exercise_type_id,
                },
              },
              data: {
                exercise_group: templateExerciseType.exercise_group,
                is_deleted: false,
                updated_at: clientUpdatedAt,
              },
            })
          );
        } else if (
          templateExerciseType.is_deleted &&
          remoteTemplateExerciseType &&
          clientUpdatedAt > remoteTemplateExerciseType.updated_at
        ) {
          // Soft delete if deletion is more recent
          operations.push(
            prisma.template_exercise_type.update({
              where: {
                template_exercise_id_exercise_type_id: {
                  template_exercise_id: templateExerciseType.template_exercise_id,
                  exercise_type_id: templateExerciseType.exercise_type_id,
                },
              },
              data: {
                is_deleted: true,
                updated_at: clientUpdatedAt,
              },
            })
          );
        }
      }

      await prisma.$transaction(operations);
    } catch (error: any) {
      console.error("Error syncing template exercise types:", error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new RequestError(`Failed to sync template exercise types: ${error.message}`);
      }
      throw new RequestError("Failed to sync template exercise types");
    }
  }

  async checkSetSetTypesToSync(setIds: number[], setTypeIds: number[]): Promise<SetSetTypeIds[]> {
    try {
      const setSetTypes = await prisma.set_set_type.findMany({
        where: { set_id: { in: setIds }, set_type_id: { in: setTypeIds } },
        select: { set_id: true, set_type_id: true, updated_at: true },
      });

      return setSetTypes.map((setSetType) => ({
        set_id: Number(setSetType.set_id),
        set_type_id: Number(setSetType.set_type_id),
        updated_at: setSetType.updated_at,
      }));
    } catch (error: any) {
      console.error("Error checking set set types to sync:", error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new RequestError(`Failed to check set set types: ${error.message}`);
      }
      throw new RequestError("Failed to check set set types");
    }
  }

  syncSetSetTypes(remoteIdAndUpdatedAt: SetSetTypeIds[], data: SetSetType[]): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async checkSetIntensitiesToSync(setIntensityIds: number[], intensityIds: number[]): Promise<SetIntensityIds[]> {
    try {
      const setIntensities = await prisma.set_intensity.findMany({
        where: {
          set_id: { in: setIntensityIds },
          instensity_id: { in: intensityIds },
        },
        select: { set_id: true, instensity_id: true, updated_at: true },
      });

      return setIntensities.map((setIntensity) => ({
        set_id: Number(setIntensity.set_id),
        intensity_id: Number(setIntensity.instensity_id),
        updated_at: setIntensity.updated_at,
      }));
    } catch (error: any) {
      console.error("Error checking set intensities to sync:", error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new RequestError(`Failed to check set intensities: ${error.message}`);
      }
      throw new RequestError("Failed to check set intensities");
    }
  }

  async syncSetIntensities(remoteIdAndUpdatedAt: SetIntensityIds[], data: SetIntensity[]): Promise<void> {
    try {
      const operations = [];

      for (const setIntensity of data) {
        const remoteSetIntensity = remoteIdAndUpdatedAt.find(
          (item) => item.set_id === setIntensity.set_id && item.intensity_id === setIntensity.intensity_id
        );
        const clientUpdatedAt = new Date(setIntensity.updated_at);

        if (!remoteSetIntensity && !setIntensity.is_deleted) {
          // Create
          operations.push(
            prisma.set_intensity.create({
              data: {
                set_id: setIntensity.set_id,
                instensity_id: setIntensity.intensity_id,
                intensity_level: setIntensity.intensity_level,
                failure: setIntensity.failure,
                is_deleted: setIntensity.is_deleted,
                created_at: new Date(setIntensity.created_at),
                updated_at: clientUpdatedAt,
              },
            })
          );
        } else if (remoteSetIntensity && clientUpdatedAt > remoteSetIntensity.updated_at && !setIntensity.is_deleted) {
          // Update
          operations.push(
            prisma.set_intensity.update({
              where: { set_id_instensity_id: { set_id: setIntensity.set_id, instensity_id: setIntensity.intensity_id } },
              data: {
                intensity_level: setIntensity.intensity_level,
                failure: setIntensity.failure,
                is_deleted: false,
                updated_at: clientUpdatedAt,
              },
            })
          );
        } else if (setIntensity.is_deleted && remoteSetIntensity && clientUpdatedAt > remoteSetIntensity.updated_at) {
          // Soft delete if deletion is more recent
          operations.push(
            prisma.set_intensity.update({
              where: { set_id_instensity_id: { set_id: setIntensity.set_id, instensity_id: setIntensity.intensity_id } },
              data: {
                is_deleted: true,
                updated_at: clientUpdatedAt,
              },
            })
          );
        }
      }

      await prisma.$transaction(operations);
    } catch (error: any) {
      console.error("Error syncing set intensities:", error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new RequestError(`Failed to sync set intensities: ${error.message}`);
      }
      throw new RequestError("Failed to sync set intensities");
    }
  }

  async checkSetsToSync(setIds: number[]): Promise<IdAndUpdatedAt[]> {
    try {
      const sets = await prisma.set.findMany({
        where: { id: { in: setIds } },
        select: { id: true, updated_at: true },
      });

      return sets.map((set) => ({
        id: Number(set.id),
        updated_at: set.updated_at,
      }));
    } catch (error: any) {
      console.error("Error checking sets to sync:", error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new RequestError(`Failed to check sets: ${error.message}`);
      }
      throw new RequestError("Failed to check sets");
    }
  }

  async syncSets(remoteIdAndUpdatedAt: IdAndUpdatedAt[], data: Set[]): Promise<void> {
    try {
      const operations = [];

      for (const set of data) {
        const remoteSet = remoteIdAndUpdatedAt.find((item) => item.id === set.id);
        const clientUpdatedAt = new Date(set.updated_at);

        if (!remoteSet && !set.is_deleted) {
          // Create
          operations.push(
            prisma.set.create({
              data: {
                id: set.id,
                workout_exercise_id: set.workout_exercise_id,
                reps: set.reps,
                weight: set.weight,
                set_number: set.set_number,
                note: set.note,
                is_deleted: set.is_deleted,
                created_at: new Date(set.created_at),
                updated_at: clientUpdatedAt,
              },
            })
          );
        } else if (remoteSet && clientUpdatedAt > remoteSet.updated_at && !set.is_deleted) {
          // Update
          operations.push(
            prisma.set.update({
              where: { id: set.id },
              data: {
                workout_exercise_id: set.workout_exercise_id,
                reps: set.reps,
                weight: set.weight,
                set_number: set.set_number,
                note: set.note,
                is_deleted: false,
                updated_at: clientUpdatedAt,
              },
            })
          );
        } else if (set.is_deleted && remoteSet && clientUpdatedAt > remoteSet.updated_at) {
          // Soft delete if deletion is more recent
          operations.push(
            prisma.set.update({
              where: { id: set.id },
              data: {
                is_deleted: true,
                updated_at: clientUpdatedAt,
              },
            })
          );
        }
      }

      await prisma.$transaction(operations);
    } catch (error: any) {
      console.error("Error syncing sets:", error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new RequestError(`Failed to sync sets: ${error.message}`);
      }
      throw new RequestError("Failed to sync sets");
    }
  }

  async checkWorkoutExercisesToSync(workoutExerciseIds: number[]): Promise<IdAndUpdatedAt[]> {
    try {
      const workoutExercises = await prisma.workout_exercise.findMany({
        where: { id: { in: workoutExerciseIds } },
        select: { id: true, updated_at: true },
      });

      return workoutExercises.map((workoutExercise) => ({
        id: Number(workoutExercise.id),
        updated_at: workoutExercise.updated_at,
      }));
    } catch (error: any) {
      console.error("Error checking workout exercises to sync:", error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new RequestError(`Failed to check workout exercises: ${error.message}`);
      }
      throw new RequestError("Failed to check workout exercises");
    }
  }

  async syncWorkoutExercises(remoteIdAndUpdatedAt: IdAndUpdatedAt[], data: WorkoutExercise[]): Promise<void> {
    try {
      const operations = [];

      for (const workoutExercise of data) {
        const remoteWorkoutExercise = remoteIdAndUpdatedAt.find((item) => item.id === workoutExercise.id);
        const clientUpdatedAt = new Date(workoutExercise.updated_at);

        if (!remoteWorkoutExercise && !workoutExercise.is_deleted) {
          // Create
          operations.push(
            prisma.workout_exercise.create({
              data: {
                id: workoutExercise.id,
                workout_id: workoutExercise.workout_id,
                exercise_id: workoutExercise.exercise_id,
                order: workoutExercise.order,
                set_up: workoutExercise.set_up,
                is_deleted: workoutExercise.is_deleted,
                created_at: new Date(workoutExercise.created_at),
                updated_at: clientUpdatedAt,
              },
            })
          );
        } else if (remoteWorkoutExercise && clientUpdatedAt > remoteWorkoutExercise.updated_at && !workoutExercise.is_deleted) {
          // Update
          operations.push(
            prisma.workout_exercise.update({
              where: { id: workoutExercise.id },
              data: {
                workout_id: workoutExercise.workout_id,
                exercise_id: workoutExercise.exercise_id,
                order: workoutExercise.order,
                set_up: workoutExercise.set_up,
                is_deleted: false,
                updated_at: clientUpdatedAt,
              },
            })
          );
        } else if (workoutExercise.is_deleted && remoteWorkoutExercise && clientUpdatedAt > remoteWorkoutExercise.updated_at) {
          // Soft delete if deletion is more recent
          operations.push(
            prisma.workout_exercise.update({
              where: { id: workoutExercise.id },
              data: {
                is_deleted: true,
                updated_at: clientUpdatedAt,
              },
            })
          );
        }
      }

      await prisma.$transaction(operations);
    } catch (error: any) {
      console.error("Error syncing workout exercises:", error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new RequestError(`Failed to sync workout exercises: ${error.message}`);
      }
      throw new RequestError("Failed to sync workout exercises");
    }
  }

  async checkWorkoutsToSync(workoutIds: number[]): Promise<IdAndUpdatedAt[]> {
    try {
      const workouts = await prisma.workout.findMany({
        where: { id: { in: workoutIds } },
        select: { id: true, updated_at: true },
      });

      return workouts.map((workout) => ({
        id: Number(workout.id),
        updated_at: workout.updated_at,
      }));
    } catch (error: any) {
      console.error("Error checking workouts to sync:", error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new RequestError(`Failed to check workouts: ${error.message}`);
      }
      throw new RequestError("Failed to check workouts");
    }
  }

  async syncWorkouts(remoteIdAndUpdatedAt: IdAndUpdatedAt[], data: Workout[]): Promise<void> {
    try {
      const operations = [];

      for (const workout of data) {
        const remoteWorkout = remoteIdAndUpdatedAt.find((item) => item.id === workout.id);
        const clientUpdatedAt = new Date(workout.updated_at);

        if (!remoteWorkout && !workout.is_deleted) {
          // Créer
          operations.push(
            prisma.workout.create({
              data: {
                id: workout.id,
                workout_template_id: workout.workout_template_id,
                note: workout.note,
                duration: workout.duration,
                is_deleted: workout.is_deleted,
                created_at: new Date(workout.created_at),
                updated_at: clientUpdatedAt,
              },
            })
          );
        } else if (remoteWorkout && clientUpdatedAt > remoteWorkout.updated_at && !workout.is_deleted) {
          // Mettre à jour
          operations.push(
            prisma.workout.update({
              where: { id: workout.id },
              data: {
                workout_template_id: workout.workout_template_id,
                note: workout.note,
                duration: workout.duration,
                is_deleted: false,
                updated_at: clientUpdatedAt,
              },
            })
          );
        } else if (workout.is_deleted && remoteWorkout && clientUpdatedAt > remoteWorkout.updated_at) {
          // Supprimer (logique) si suppression plus récente
          operations.push(
            prisma.workout.update({
              where: { id: workout.id },
              data: {
                is_deleted: true,
                updated_at: clientUpdatedAt,
              },
            })
          );
        }
      }

      await prisma.$transaction(operations);
    } catch (error: any) {
      console.error("Error syncing workouts:", error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new RequestError(`Failed to sync workouts: ${error.message}`);
      }
      throw new RequestError("Failed to sync workouts");
    }
  }

  async checkTemplateExercisesToSync(templateExerciseIds: number[]): Promise<IdAndUpdatedAt[]> {
    try {
      const templateExercises = await prisma.template_exercise.findMany({
        where: { id: { in: templateExerciseIds } },
        select: { id: true, updated_at: true },
      });

      return templateExercises.map((templateExercise) => ({
        id: Number(templateExercise.id),
        updated_at: templateExercise.updated_at,
      }));
    } catch (error: any) {
      console.error("Error checking template exercises to sync:", error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new RequestError(`Failed to check template exercises: ${error.message}`);
      }
      throw new RequestError("Failed to check template exercises");
    }
  }

  async syncTemplateExercises(remoteIdAndUpdatedAt: IdAndUpdatedAt[], data: TemplateExercise[]): Promise<void> {
    try {
      const operations = [];

      for (const templateExercise of data) {
        const remoteTemplateExercise = remoteIdAndUpdatedAt.find((item) => item.id === templateExercise.id);
        const clientUpdatedAt = new Date(templateExercise.updated_at);

        if (!remoteTemplateExercise && !templateExercise.is_deleted) {
          // Créer
          operations.push(
            prisma.template_exercise.create({
              data: {
                id: templateExercise.id,
                template_id: templateExercise.template_id,
                set_up: templateExercise.set_up,
                order: templateExercise.order,
                exercise_id: templateExercise.exercise_id,
                is_deleted: templateExercise.is_deleted,
                created_at: new Date(templateExercise.created_at),
                updated_at: clientUpdatedAt,
              },
            })
          );
        } else if (remoteTemplateExercise && clientUpdatedAt > remoteTemplateExercise.updated_at && !templateExercise.is_deleted) {
          // Mettre à jour
          operations.push(
            prisma.template_exercise.update({
              where: { id: templateExercise.id },
              data: {
                template_id: templateExercise.template_id,
                set_up: templateExercise.set_up,
                order: templateExercise.order,
                exercise_id: templateExercise.exercise_id,
                is_deleted: false,
                updated_at: clientUpdatedAt,
              },
            })
          );
        } else if (templateExercise.is_deleted && remoteTemplateExercise && clientUpdatedAt > remoteTemplateExercise.updated_at) {
          // Supprimer (logique) si suppression plus récente
          operations.push(
            prisma.template_exercise.update({
              where: { id: templateExercise.id },
              data: {
                is_deleted: true,
                updated_at: clientUpdatedAt,
              },
            })
          );
        }
      }

      await prisma.$transaction(operations);
    } catch (error: any) {
      console.error("Error syncing template exercises:", error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new RequestError(`Failed to sync template exercises: ${error.message}`);
      }
      throw new RequestError("Failed to sync template exercises");
    }
  }
  async checkTemplateSetsToSync(templateSetIds: number[]): Promise<IdAndUpdatedAt[]> {
    try {
      const templateSets = await prisma.template_set.findMany({
        where: { id: { in: templateSetIds } },
        select: { id: true, updated_at: true },
      });

      return templateSets.map((templateSet) => ({
        id: Number(templateSet.id),
        updated_at: templateSet.updated_at,
      }));
    } catch (error: any) {
      console.error("Error checking template sets to sync:", error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new RequestError(`Failed to check template sets: ${error.message}`);
      }
      throw new RequestError("Failed to check template sets");
    }
  }

  async syncTemplateSets(remoteIdAndUpdatedAt: IdAndUpdatedAt[], data: TemplateSet[]): Promise<void> {
    try {
      const operations = [];

      for (const templateSet of data) {
        const remoteTemplateSet = remoteIdAndUpdatedAt.find((item) => item.id === templateSet.id);
        const clientUpdatedAt = new Date(templateSet.updated_at);

        if (!remoteTemplateSet && !templateSet.is_deleted) {
          // Créer
          operations.push(
            prisma.template_set.create({
              data: {
                id: templateSet.id,
                template_exercise_id: templateSet.template_exercise_id,
                set_number: templateSet.set_number,
                low_rep: templateSet.low_reps,
                high_rep: templateSet.high_reps,
                is_deleted: templateSet.is_deleted,
                created_at: new Date(templateSet.created_at),
                updated_at: clientUpdatedAt,
              },
            })
          );
        } else if (remoteTemplateSet && clientUpdatedAt > remoteTemplateSet.updated_at && !templateSet.is_deleted) {
          // Mettre à jour
          operations.push(
            prisma.template_set.update({
              where: { id: templateSet.id },
              data: {
                template_exercise_id: templateSet.template_exercise_id,
                set_number: templateSet.set_number,
                low_rep: templateSet.low_reps,
                high_rep: templateSet.high_reps,
                is_deleted: false,
                updated_at: clientUpdatedAt,
              },
            })
          );
        } else if (templateSet.is_deleted && remoteTemplateSet && clientUpdatedAt > remoteTemplateSet.updated_at) {
          // Supprimer (logique) si suppression plus récente
          operations.push(
            prisma.template_set.update({
              where: { id: templateSet.id },
              data: {
                is_deleted: true,
                updated_at: clientUpdatedAt,
              },
            })
          );
        }
      }

      await prisma.$transaction(operations);
    } catch (error: any) {
      console.error("Error syncing template sets:", error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new RequestError(`Failed to sync template sets: ${error.message}`);
      }
      throw new RequestError("Failed to sync template sets");
    }
  }

  async checkWorkoutTemplatesToSync(workoutTemplateIds: number[]): Promise<IdAndUpdatedAt[]> {
    try {
      const workoutTemplates = await prisma.workout_template.findMany({
        where: { id: { in: workoutTemplateIds } },
        select: { id: true, updated_at: true },
      });

      return workoutTemplates.map((workoutTemplate) => ({
        id: Number(workoutTemplate.id),
        updated_at: workoutTemplate.updated_at,
      }));
    } catch (error: any) {
      console.error("Error checking workout templates to sync:", error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new RequestError(`Failed to check workout templates: ${error.message}`);
      }
      throw new RequestError("Failed to check workout templates");
    }
  }

  async syncWorkoutTemplates(remoteIdAndUpdatedAt: IdAndUpdatedAt[], data: WorkoutTemplate[]): Promise<void> {
    try {
      const operations = [];
      console.log("Syncing workout templates:", data.length, "items");

      for (const workout of data) {
        console.log("Processing workout template:", workout.id, workout.updated_at);

        const remoteWorkout = remoteIdAndUpdatedAt.find((item) => item.id === workout.id);
        const clientUpdatedAt = new Date(workout.updated_at);

        if (!remoteWorkout && !workout.is_deleted) {
          // Créer
          operations.push(
            prisma.workout_template.create({
              data: {
                id: workout.id,
                user_id: workout.user_id,
                name: workout.name,
                order: workout.order,
                is_deleted: workout.is_deleted,
                created_at: new Date(workout.created_at),
                updated_at: clientUpdatedAt,
              },
            })
          );
        } else if (remoteWorkout && clientUpdatedAt > remoteWorkout.updated_at && !workout.is_deleted) {
          // Mettre à jour
          operations.push(
            prisma.workout_template.update({
              where: { id: workout.id },
              data: {
                name: workout.name,
                order: workout.order,
                user_id: workout.user_id,
                is_deleted: false,
                updated_at: clientUpdatedAt,
              },
            })
          );
        } else if (workout.is_deleted && remoteWorkout && clientUpdatedAt > remoteWorkout.updated_at) {
          // Supprimer (logique) si suppression plus récente
          operations.push(
            prisma.workout_template.update({
              where: { id: workout.id },
              data: {
                is_deleted: true,
                updated_at: clientUpdatedAt,
              },
            })
          );
        }
      }

      await prisma.$transaction(operations);
    } catch (error: any) {
      console.error("Error syncing workout templates:", error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new RequestError(`Failed to sync workout templates: ${error.message}`);
      }
      throw new RequestError("Failed to sync workout templates");
    }
  }

  async syncExercises(remoteIdAndUpdatedAt: IdAndUpdatedAt[], data: Exercise[]): Promise<void> {
    try {
      const operations = [];

      for (const exercise of data) {
        const remoteExercise = remoteIdAndUpdatedAt.find((item) => item.id === exercise.id);
        const clientUpdatedAt = new Date(exercise.updated_at);

        if (!remoteExercise && !exercise.is_deleted) {
          // Créer
          operations.push(
            prisma.exercise.create({
              data: {
                id: exercise.id,
                name: exercise.name,
                description: exercise.description,
                user_id: exercise.user_id,
                is_deleted: exercise.is_deleted,
                created_at: new Date(exercise.created_at),
                updated_at: clientUpdatedAt,
              },
            })
          );
        } else if (remoteExercise && clientUpdatedAt > remoteExercise.updated_at && !exercise.is_deleted) {
          // Mettre à jour
          operations.push(
            prisma.exercise.update({
              where: { id: exercise.id },
              data: {
                name: exercise.name,
                description: exercise.description,
                user_id: exercise.user_id,
                is_deleted: false,
                updated_at: clientUpdatedAt,
              },
            })
          );
        } else if (exercise.is_deleted && remoteExercise && clientUpdatedAt > remoteExercise.updated_at) {
          // Supprimer (logique) si suppression plus récente
          operations.push(
            prisma.exercise.update({
              where: { id: exercise.id },
              data: {
                is_deleted: true,
                updated_at: clientUpdatedAt,
              },
            })
          );
        }
      }

      await prisma.$transaction(operations);
    } catch (error: any) {
      console.error("Error syncing exercises:", error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new RequestError(`Failed to sync exercises: ${error.message}`);
      }
      throw new RequestError("Failed to sync exercises");
    }
  }

  async checkUserDeviceId(userId: string, deviceId: string): Promise<boolean> {
    const userDevice = await prisma.user.findUnique({
      where: { id: userId, device_id: deviceId },
    });

    if (!userDevice) {
      return false;
    }

    return !!userDevice;
  }

  async getNonSyncData(userId: string, lastSync: string): Promise<any> {
    const nonSyncData = (await prisma.$queryRaw`
      SELECT get_user_data(${userId}::uuid, ${lastSync}::timestamp);
    `) as any[];
    return nonSyncData[0]?.get_user_data || null;
  }

  async updateUserDeviceId(userId: string, deviceId: string): Promise<void> {
    await prisma.user.update({
      where: { id: userId },
      data: { device_id: deviceId },
    });
  }

  async checkExercisesToSync(exercisesIds: number[]): Promise<IdAndUpdatedAt[]> {
    try {
      const exercises = await prisma.exercise.findMany({
        where: { id: { in: exercisesIds } },
        select: { id: true, updated_at: true },
      });

      return exercises.map((exercise) => ({
        id: Number(exercise.id),
        updated_at: exercise.updated_at,
      }));
    } catch (error: any) {
      console.error("Error checking exercises to sync:", error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new RequestError(`Failed to check exercises: ${error.message}`);
      }
      throw new RequestError("Failed to check exercises");
    }
  }
}
