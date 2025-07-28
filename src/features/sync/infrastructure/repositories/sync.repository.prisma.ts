import { prisma } from "@config/prisma.js";
import type { IdAndUpdatedAt, SyncRepository } from "@features/sync/domain/repositories/sync.repository.js";
import type { Exercise } from "@features/sync/interfaces/http/types/sync-client-data.type.js";

export class SyncRepositoryPrisma implements SyncRepository {
  async syncExercises(remoteIdAndUpdatedAt: IdAndUpdatedAt[], data: Exercise[]): Promise<void> {
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
