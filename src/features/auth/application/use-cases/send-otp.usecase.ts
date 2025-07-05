import { User } from "@features/auth/domain/entities/user.entity.js";
import type { AuthService } from "@features/auth/domain/services/auth.service.js";
import { Email } from "@features/auth/domain/value-object/email.vo.js";
import { InvalidArgumentsError } from "@shared/errors/InvalidArgumentsError.js";

export class SendOtpUseCase {
  constructor(private authService: AuthService) {}

  async execute(email: string): Promise<void> {
    if (!email) {
      throw new InvalidArgumentsError("Email is required");
    }

    const user = new User(new Email(email));

    await this.authService.sendOtp(user);
  }
}
