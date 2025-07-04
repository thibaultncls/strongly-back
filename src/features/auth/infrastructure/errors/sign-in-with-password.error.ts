import { ERROR_NAMES } from "@shared/constants/error.constant.js";

export class SignInWithPasswordError extends Error {
  constructor(message: string) {
    super(message);
    this.name = ERROR_NAMES.SIGN_IN_WITH_PASSWORD_ERROR;
  }
}
