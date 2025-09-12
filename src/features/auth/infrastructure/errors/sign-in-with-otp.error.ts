import { ERROR_NAMES } from "@shared/constants/error.constant.js";

export class SignInWithOtpError extends Error {
  constructor(message: string) {
    super(message);
    this.name = ERROR_NAMES.SIGN_IN_WITH_OTP_ERROR;
  }
}
