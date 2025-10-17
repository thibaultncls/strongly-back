import { container } from "@config/inversify.js";
import type { DeleteAccountUseCase } from "@features/account/application/use-cases/delete-account.usecase.js";
import { TYPES } from "@shared/constants/identifier.constant.js";
import { RequestError } from "@shared/errors/RequestError.js";
import type { Context } from "hono";

export async function deleteAccount(c: Context) {
  const userId = c.get("user").id;

  try {
    await container.get<DeleteAccountUseCase>(TYPES.DELETE_ACCOUNT_USE_CASE).execute(userId);
    return c.json({ message: "Account deleted successfully" });
  } catch (error) {
    if (error instanceof RequestError) {
      return c.json({ error: error.message }, 500);
    }
    return c.json({ error: "Failed to delete account" }, 500);
  }
}
