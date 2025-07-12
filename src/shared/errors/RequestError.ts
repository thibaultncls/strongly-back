import { ERROR_NAMES } from "@shared/constants/error.constant.js";

export class RequestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = ERROR_NAMES.REQUEST_ERROR;
  }
}
