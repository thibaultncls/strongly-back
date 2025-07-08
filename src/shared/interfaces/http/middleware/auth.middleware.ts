import { container } from "@config/inversify.js";
import type { VerifyTokenUseCase } from "@shared/application/use-case/verify-token.usecase.js";
import { TYPES } from "@shared/constants/identifier.constant.js";
import { TokenError } from "@shared/errors/TokenError.js";
import type { Context } from "hono";
import { createMiddleware } from "hono/factory";

export const authMiddleware = createMiddleware(async (c: Context, next: Function) => {
  try {
    const token = c.req.header("Authorization")?.replace("Bearer ", "");

    const useCase = container.get<VerifyTokenUseCase>(TYPES.VERIFY_TOKEN_USE_CASE);
    const userToken = await useCase.execute(token);

    c.set("user", userToken);
    await next();
  } catch (error: any) {
    if (error instanceof TokenError) {
      console.error("Authentication error:", error.message);
      return c.json({ error: error.message }, 401);
    } else {
      console.error("Unexpected error during authentication:", error);
      return c.json({ error: "Internal server error" }, 500);
    }
  }
});
