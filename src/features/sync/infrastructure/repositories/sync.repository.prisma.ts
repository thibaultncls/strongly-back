import { prisma } from "@config/prisma.js";
import type { IdAndUpdatedAt, SyncRepository } from "@features/sync/domain/repositories/sync.repository.js";
import type { Exercise } from "@features/sync/interfaces/http/types/sync-client-data.type.js";

export class SyncRepositoryPrisma implements SyncRepository {
  async syncExercises(remoteIdAndUpdatedAt: IdAndUpdatedAt[], data: Exercise[]): Promise<void> {
    await prisma.$transaction(async (tx) => {
      for (const exercise of data) {
        const remoteExercise = remoteIdAndUpdatedAt.find((ex) => ex.id === exercise.id);
        if (!remoteExercise && !exercise.is_deleted) {
          // Create new exercise
          await tx.exercise.create({
            data: {
              id: exercise.id,
              name: exercise.name,
              user_id: exercise.user_id,
              description: exercise.description,
              is_deleted: exercise.is_deleted,
              created_at: new Date(exercise.created_at),
              updated_at: new Date(exercise.updated_at),
            },
          });
        } else if (remoteExercise && new Date(exercise.updated_at) > remoteExercise.updated_at) {
          // Update existing exercise
          await tx.exercise.update({
            where: { id: exercise.id },
            data: {
              name: exercise.name,
              user_id: exercise.user_id,
              description: exercise.description,
              is_deleted: exercise.is_deleted,
              updated_at: new Date(exercise.updated_at),
            },
          });
        } else if (exercise.is_deleted) {
          // Mark as deleted
          await tx.exercise.update({
            where: { id: exercise.id },
            data: { is_deleted: true, updated_at: new Date() },
          });
        }
      }
    });
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
