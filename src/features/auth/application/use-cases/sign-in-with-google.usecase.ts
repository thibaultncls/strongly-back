import type { AuthRepository } from "@features/auth/domain/repositories/auth.repository.js";
import type { AuthService, AuthToken } from "@features/auth/domain/services/auth.service.js";
import { InvalidArgumentsError } from "@shared/errors/InvalidArgumentsError.js";

export class SignInWithGoogleUseCase {
  constructor(private readonly authService: AuthService, private readonly authRepository: AuthRepository) {}

  async execute({ token, accessToken }: { token?: string; accessToken?: string }): Promise<AuthToken> {
    if (!token || !accessToken) {
      throw new InvalidArgumentsError("Token is required for signing in with Google");
    }

    const authToken = await this.authService.signInWithGoogle(token, accessToken);

    const isUserExists = await this.authRepository.checkIfUserExistsByUuid(authToken.userId);

    if (!isUserExists) {
      await this.authRepository.createUser(authToken.userId, authToken.email);
    }

    return authToken;
  }
}
