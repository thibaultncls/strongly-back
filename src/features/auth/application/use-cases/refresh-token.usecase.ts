import type { AuthService, AuthToken } from "@features/auth/domain/services/auth.service.js";
import { InvalidArgumentsError } from "@shared/errors/InvalidArgumentsError.js";

export class RefreshTokenUseCase {
  constructor(private readonly authService: AuthService) {}

  async execute({ refreshToken }: { refreshToken: string }): Promise<AuthToken> {
    if (!refreshToken) {
      throw new InvalidArgumentsError("Refresh token is required");
    }

    return this.authService.refreshToken(refreshToken);
  }
}
