import type { AuthRepository } from "@features/auth/domain/repositories/auth.repository.js";
import type { AuthService } from "@features/auth/domain/services/auth.service.js";
import { Email } from "@features/auth/domain/value-object/email.vo.js";
import { OTP } from "@features/auth/domain/value-object/otp.vo.js";
import type { AuthUserDto } from "../dto/auth-user.dto.js";

export class VerifyOtpUseCase {
  constructor(private readonly authService: AuthService, private readonly authRepository: AuthRepository) {}

  async execute({ email, otp }: { email: string; otp: string }): Promise<AuthUserDto> {
    if (!email || !otp) {
      throw new Error("Email and OTP are required");
    }

    const authToken = await this.authService.verifyOtp(new Email(email), new OTP(otp));

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
