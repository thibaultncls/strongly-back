import type { AuthService } from "@features/auth/domain/services/auth.service.js";
import { InvalidArgumentsError } from "@shared/errors/InvalidArgumentsError.js";

export class SendOtpUseCase {
  constructor(private authService: AuthService) {}

  async execute(email: string): Promise<void> {
    if (!email) {
      throw new InvalidArgumentsError("Email is required");
    }

    await this.authService.sendOtp(email);
  }
}
