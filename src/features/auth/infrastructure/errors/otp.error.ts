import { ERROR_NAMES } from "@shared/constants/error.constant.js";

export class OtpError extends Error {
  constructor(message: string) {
    super(message);
    this.name = ERROR_NAMES.OTP_ERROR;
  }
}
