import { supabase } from "@config/supabase.js";
import type { AuthRepository } from "@features/auth/domain/repositories/auth.repository.js";
import type { AuthService } from "@features/auth/domain/services/auth.service.js";

export class SignInWithAppleUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly authService: AuthService
  ) {}

  async execute({ token }: { token: string }) {
    const authToken = await this.authService.signInWithApple(token);

    return authToken;
  }
}
