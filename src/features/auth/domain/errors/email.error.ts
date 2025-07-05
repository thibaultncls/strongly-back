import { ERROR_NAMES } from "@shared/constants/error.constant.js";

export class EmailError extends Error {
  constructor(message: string) {
    super(message);
    this.name = ERROR_NAMES.EMAIL_ERROR;
  }
}
