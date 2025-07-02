import { container } from "@config/inversify.js";
import { SignInWithAppleUseCase } from "@features/auth/application/use-cases/sign-in-with-apple.usecase.js";
import { SignInWithAppleError } from "@features/auth/infrastructure/errors/sign-in-with-apple.error.js";
import { TYPES } from "@shared/constants/identifier.constant.js";
import type { Context } from "hono";

export async function signInWithApple(c: Context) {
  const { token } = await c.req.json();

  try {
    const userCase = container.get<SignInWithAppleUseCase>(
      TYPES.SIGN_IN_WITH_APPLE_USE_CASE
    );

    const authToken = await userCase.execute({ token });

    console.log("Auth token:", authToken);

    return c.json({
      accessToken: authToken.accessToken,
      refreshToken: authToken.refreshToken,
      userId: authToken.userId,
    });
  } catch (error: any) {
    if (error instanceof SignInWithAppleError) {
      return c.json({ error: error.message }, 400);
    } else {
      return c.json({ error: "An unexpected error occurred" }, 500);
    }
  }
}
