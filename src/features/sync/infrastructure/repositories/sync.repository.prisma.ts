import { prisma } from "@config/prisma.js";
import type { IdAndUpdatedAt, SyncRepository } from "@features/sync/domain/repositories/sync.repository.js";

export class SyncRepositoryPrisma implements SyncRepository {
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
