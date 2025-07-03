import { ERROR_NAMES } from "@shared/constants/error.constant.js";

export class CreateError extends Error {
  constructor(message: string) {
    super(message);
    this.name = ERROR_NAMES.CREATE_ERROR;
  }
}
