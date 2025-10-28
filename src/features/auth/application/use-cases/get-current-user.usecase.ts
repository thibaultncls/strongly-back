import type { AuthRepository } from "@features/auth/domain/repositories/auth.repository.js";
import type { AuthService } from "@features/auth/domain/services/auth.service.js";
import { TokenError } from "@shared/errors/TokenError.js";
import type { AuthUserDto } from "../dto/auth-user.dto.js";

export class GetCurrentUserUseCase {
  constructor(private authService: AuthService, private authRepository: AuthRepository) {}

  async execute(token?: string, refreshToken?: string): Promise<AuthUserDto> {
    if (!token || !refreshToken || typeof token !== "string" || typeof refreshToken !== "string") {
      throw TokenError.tokenNotFound();
    }

    const authToken = await this.authService.getCurrentUser(token, refreshToken);

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
