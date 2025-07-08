import { TokenError } from "@shared/errors/TokenError.js";
import type { TokenService, UserToken } from "@shared/services/token.service.js";

export class VerifyTokenUseCase {
  constructor(private readonly tokenService: TokenService) {}

  async execute(token: string | undefined): Promise<UserToken> {
    if (!token) {
      throw TokenError.tokenNotFound();
    }

    const userToken = await this.tokenService.verifyToken(token);
    if (!userToken) {
      console.warn("Token verification failed or user not found.");
      throw TokenError.tokenVerificationFailed();
    }

    console.log("Token verified successfully for user:", userToken.id);
    return userToken;
  }
}
