import type { SyncRepository } from "@features/sync/domain/repositories/sync.repository.js";
import { InvalidArgumentsError } from "@shared/errors/InvalidArgumentsError.js";

export class GetNonSyncDataUseCase {
  constructor(private readonly syncRepository: SyncRepository) {}

  async execute(userId: string, lastSync: string): Promise<any> {
    if (!userId || !lastSync) {
      throw new InvalidArgumentsError("User ID, last sync date are required");
    }

    const nonSyncData = await this.syncRepository.getNonSyncData(userId, lastSync);

    return nonSyncData;
  }
}
