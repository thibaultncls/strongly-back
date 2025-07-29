import { prisma } from "@config/prisma.js";
import type { IdAndUpdatedAt, SyncRepository } from "@features/sync/domain/repositories/sync.repository.js";
import type {
  Exercise,
  TemplateExercise,
  TemplateSet,
  Workout,
  WorkoutTemplate,
} from "@features/sync/interfaces/http/types/sync-client-data.type.js";
import { Prisma } from "@prisma/client";
import { RequestError } from "@shared/errors/RequestError.js";

export class SyncRepositoryPrisma implements SyncRepository {
  async checkWorkoutsToSync(workoutIds: number[]): Promise<IdAndUpdatedAt[]> {
    const workouts = await prisma.workout.findMany({
      where: { id: { in: workoutIds } },
      select: { id: true, updated_at: true },
    });

    return workouts.map((workout) => ({
      id: Number(workout.id),
      updated_at: workout.updated_at,
    }));
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
                id: workout.id,
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
    const templateExercises = await prisma.template_exercise.findMany({
      where: { id: { in: templateExerciseIds } },
      select: { id: true, updated_at: true },
    });

    return templateExercises.map((templateExercise) => ({
      id: Number(templateExercise.id),
      updated_at: templateExercise.updated_at,
    }));
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
                id: templateExercise.id,
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
    const templateSets = await prisma.template_set.findMany({
      where: { id: { in: templateSetIds } },
      select: { id: true, updated_at: true },
    });

    return templateSets.map((templateSet) => ({
      id: Number(templateSet.id),
      updated_at: templateSet.updated_at,
    }));
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
                id: templateSet.id,
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
    const workoutTemplates = await prisma.workout_template.findMany({
      where: { id: { in: workoutTemplateIds } },
      select: { id: true, updated_at: true },
    });

    return workoutTemplates.map((workoutTemplate) => ({
      id: Number(workoutTemplate.id),
      updated_at: workoutTemplate.updated_at,
    }));
  }

  async syncWorkoutTemplates(remoteIdAndUpdatedAt: IdAndUpdatedAt[], data: WorkoutTemplate[]): Promise<void> {
    try {
      const operations = [];

      for (const workout of data) {
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
                id: workout.id,
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
    const nonSyncData = await prisma.$queryRaw`
  SELECT * FROM get_user_data(${userId}::uuid, ${lastSync}::timestamp);
`;
    return nonSyncData;
  }

  async updateUserDeviceId(userId: string, deviceId: string): Promise<void> {
    await prisma.user.update({
      where: { id: userId },
      data: { device_id: deviceId },
    });
  }

  async checkExercisesToSync(exercisesIds: number[]): Promise<IdAndUpdatedAt[]> {
    const exercises = await prisma.exercise.findMany({
      where: { id: { in: exercisesIds } },
      select: { id: true, updated_at: true },
    });

    return exercises.map((exercise) => ({
      id: Number(exercise.id),
      updated_at: exercise.updated_at,
    }));
  }
}
