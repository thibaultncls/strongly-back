import { prisma } from "@config/prisma.js";
import type { AccountRepository } from "@features/account/domain/repositories/account.repository.js";
import { RequestError } from "@shared/errors/RequestError.js";

export class AccountRepositoryPrisma implements AccountRepository {
  async deleteAccountById(userId: string): Promise<void> {
    try {
      await prisma.user.delete({
        where: {
          id: userId,
        },
      });
    } catch (error) {
      throw new RequestError("Failed to delete account");
    }
  }
}
