import { ERROR_NAMES } from "@shared/constants/error.constant.js";

export class RefreshTokenError extends Error {
  constructor(message: string) {
    super(message);
    this.name = ERROR_NAMES.REFRESH_TOKEN_ERROR;
  }
}
