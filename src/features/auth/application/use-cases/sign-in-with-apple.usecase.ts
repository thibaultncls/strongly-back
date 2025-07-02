import { supabase } from "@config/supabase.js";
import type { AuthRepository } from "@features/auth/domain/repositories/auth.repository.js";

export class SignInWithAppleUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute() {
    try {
      const token = await this.authRepository.signInWithApple();
      return token;
    } catch (error: any) {
      throw new Error(`Sign in with Apple failed: ${error.message}`);
    }
  }
}
