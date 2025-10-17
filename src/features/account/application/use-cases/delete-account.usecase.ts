import type { AccountRepository } from "@features/account/domain/repositories/account.repository.js";
import type { AccountService } from "@features/account/domain/services/account.service.js";

export class DeleteAccountUseCase {
  constructor(private accountRepository: AccountRepository, private accountService: AccountService) {}

  async execute(userId: string): Promise<void> {
    await this.accountRepository.deleteAccountById(userId);
    await this.accountService.revokeSessions(userId);
    await this.accountService.deleteAccount(userId);
  }
}
