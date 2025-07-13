import { ERROR_NAMES } from "@shared/constants/error.constant.js";

export class TokenError extends Error {
  constructor(message: string) {
    super(message);
    this.name = ERROR_NAMES.TOKEN_ERROR;
  }

  static invalidToken() {
    return new TokenError("Invalid token provided.");
  }

  static tokenExpired() {
    return new TokenError("Token has expired.");
  }

  static tokenNotFound() {
    return new TokenError("Token not found.");
  }

  static tokenVerificationFailed() {
    return new TokenError("Token verification failed.");
  }

  static refreshTokenFailed() {
    return new TokenError("Refresh token failed.");
  }
}
