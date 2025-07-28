import type { SyncRepository } from "@features/sync/domain/repositories/sync.repository.js";
import { InvalidArgumentsError } from "@shared/errors/InvalidArgumentsError.js";
import { json } from "stream/consumers";

export class GetNonSyncDataUseCase {
  constructor(private readonly syncRepository: SyncRepository) {}

  async execute(userId: string, lastSync: string, deviceId: string): Promise<any> {
    if (!userId || !lastSync || !deviceId) {
      throw new InvalidArgumentsError("User ID, last sync date, and device ID are required");
    }

    const nonSyncData = await this.syncRepository.getNonSyncData(userId, lastSync);

    // console.log("Non-sync data fetched successfully:", JSON.stringify(nonSyncData, null, 2));

    await this.syncRepository.updateUserDeviceId(userId, deviceId);

    return nonSyncData;
  }
}
