import { ERROR_NAMES } from "@shared/constants/error.constant.js";

export class InvalidArgumentsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = ERROR_NAMES.INVALID_ARGUMENTS_ERROR;
  }
}
