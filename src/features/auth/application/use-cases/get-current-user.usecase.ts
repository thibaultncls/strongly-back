import type { AuthService, AuthToken } from "@features/auth/domain/services/auth.service.js";
import { InvalidArgumentsError } from "@shared/errors/InvalidArgumentsError.js";
import { TokenError } from "@shared/errors/TokenError.js";

export class GetCurrentUserUseCase {
  constructor(private authService: AuthService) {}

  async execute(token?: string, refreshToken?: string): Promise<AuthToken> {
    if (!token || !refreshToken) {
      throw TokenError.tokenNotFound();
    }

    return await this.authService.getCurrentUser(token, refreshToken);
  }
}
