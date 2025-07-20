import type { SyncRepository } from "@features/sync/domain/repositories/sync.repository.js";
import { InvalidArgumentsError } from "@shared/errors/InvalidArgumentsError.js";

export class CheckUserDeviceUseCase {
  constructor(private readonly syncRepository: SyncRepository) {}

  async execute(userId: string, deviceId: string): Promise<boolean> {
    if (!userId || !deviceId) {
      throw new InvalidArgumentsError("User ID and device ID are required");
    }

    return this.syncRepository.checkUserDeviceId(userId, deviceId);
  }
}
