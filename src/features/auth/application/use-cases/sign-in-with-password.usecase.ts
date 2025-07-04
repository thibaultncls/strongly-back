import type { AuthRepository } from "@features/auth/domain/repositories/auth.repository.js";
import type { AuthService, AuthToken } from "@features/auth/domain/services/auth.service.js";
import { SignInWithPasswordError } from "@features/auth/infrastructure/errors/sign-in-with-password.error.js";
import { InvalidArgumentsError } from "@shared/errors/InvalidArgumentsError.js";

export class SignInWithPasswordUseCase {
  constructor(private authService: AuthService, private authRepository: AuthRepository) {}

  async execute({ email, password }: { email: string; password: string }): Promise<AuthToken> {
    if (!email || !password) {
      throw new InvalidArgumentsError("Email and password are required");
    }
    let authToken: AuthToken;
    const existingUser = await this.authRepository.checkIfUserExistsByEmail(email);

    // if (!existingUser) {
    authToken = await this.authService.signUpWithEmailAndPassword(email, password);
    //   await this.authRepository.createUser(authToken.userId, email);
    // } else {
    //   authToken = await this.authService.signInWithEmailAndPassword(email, password);
    // }

    return authToken;
  }
}
