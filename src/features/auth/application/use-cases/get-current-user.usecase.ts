import type { AuthService, AuthUser } from "@features/auth/domain/services/auth.service.js";
import { InvalidArgumentsError } from "@shared/errors/InvalidArgumentsError.js";
import { TokenError } from "@shared/errors/TokenError.js";

export class GetCurrentUserUseCase {
  constructor(private authService: AuthService) {}

  async execute(token?: string): Promise<AuthUser> {
    if (!token) {
      throw TokenError.tokenNotFound();
    }

    return await this.authService.getCurrentUser(token);
  }
}
