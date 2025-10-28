import type { AuthRepository } from "@features/auth/domain/repositories/auth.repository.js";
import type { AuthService } from "@features/auth/domain/services/auth.service.js";
import { InvalidArgumentsError } from "@shared/errors/InvalidArgumentsError.js";
import type { AuthUserDto } from "../dto/auth-user.dto.js";

export class RefreshTokenUseCase {
  constructor(private readonly authService: AuthService, private readonly authRepository: AuthRepository) {}

  async execute({ refreshToken }: { refreshToken: string }): Promise<AuthUserDto> {
    if (!refreshToken) {
      throw new InvalidArgumentsError("Refresh token is required");
    }

    const authToken = await this.authService.refreshToken(refreshToken);

    const createdAt = await this.authRepository.getUserCreatedAt(authToken.userId);

    return {
      userId: authToken.userId,
      email: authToken.email,
      createdAt: createdAt,
      accessToken: authToken.accessToken,
      refreshToken: authToken.refreshToken,
    };
  }
}
