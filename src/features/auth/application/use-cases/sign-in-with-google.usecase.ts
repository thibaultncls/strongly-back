import type { AuthRepository } from "@features/auth/domain/repositories/auth.repository.js";
import type { AuthService } from "@features/auth/domain/services/auth.service.js";
import { InvalidArgumentsError } from "@shared/errors/InvalidArgumentsError.js";
import type { AuthUserDto } from "../dto/auth-user.dto.js";

export class SignInWithGoogleUseCase {
  constructor(private readonly authService: AuthService, private readonly authRepository: AuthRepository) {}

  async execute({ token }: { token?: string }): Promise<AuthUserDto> {
    if (!token) {
      throw new InvalidArgumentsError("Token is required for signing in with Google");
    }

    const authToken = await this.authService.signInWithGoogle(token);

    const isUserExists = await this.authRepository.checkIfUserExistsByUuid(authToken.userId);

    if (!isUserExists) {
      await this.authRepository.createUser(authToken.userId, authToken.email);
    }

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
