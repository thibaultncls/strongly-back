import { ERROR_NAMES } from "@shared/constants/error.constant.js";

export class SignInWithGoogleError extends Error {
  constructor(message: string) {
    super(message);
    this.name = ERROR_NAMES.SIGN_IN_WITH_GOOGLE_ERROR;
  }
}
