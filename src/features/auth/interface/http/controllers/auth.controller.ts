import { container } from "@config/inversify.js";
import { SignInWithAppleUseCase } from "@features/auth/application/use-cases/sign-in-with-apple.usecase.js";
import type { SignInWithGoogleUseCase } from "@features/auth/application/use-cases/sign-in-with-google.usecase.js";
import { SignInWithAppleError } from "@features/auth/infrastructure/errors/sign-in-with-apple.error.js";
import { SignInWithGoogleError } from "@features/auth/infrastructure/errors/sign-in-with-google.error.js";
import { TYPES } from "@shared/constants/identifier.constant.js";
import { CreateError } from "@shared/errors/CreateError.js";
import { InvalidArgumentsError } from "@shared/errors/InvalidArgumentsError.js";
import type { Context } from "hono";

export async function signInWithApple(c: Context) {
  const { token } = await c.req.json();
  console.log("Received token:", token);

  try {
    const userCase = container.get<SignInWithAppleUseCase>(TYPES.SIGN_IN_WITH_APPLE_USE_CASE);
    const authToken = await userCase.execute({ token });

    console.log("Auth token:", authToken);

    return c.json({
      accessToken: authToken.accessToken,
      refreshToken: authToken.refreshToken,
      userId: authToken.userId,
      email: authToken.email,
    });
  } catch (error: any) {
    console.error("Error during sign-in with Apple:", error);
    if (error instanceof SignInWithAppleError) {
      return c.json({ error: error.message }, 400);
    } else if (error instanceof InvalidArgumentsError) {
      return c.json({ error: error.message }, 400);
    } else if (error instanceof CreateError) {
      return c.json({ error: error.message }, 500);
    } else {
      return c.json({ error: "An unexpected error occurred" }, 500);
    }
  }
}

export async function signInWithGoogle(c: Context) {
  const { token } = await c.req.json();
  console.log("Received token:", token);

  try {
    const userCase = container.get<SignInWithGoogleUseCase>(TYPES.SIGN_IN_WITH_GOOGLE_USE_CASE);
    const authToken = await userCase.execute({ token });

    console.log("Auth token:", authToken);

    return c.json({
      accessToken: authToken.accessToken,
      refreshToken: authToken.refreshToken,
      userId: authToken.userId,
      email: authToken.email,
    });
  } catch (error: any) {
    console.error("Error during sign-in with Google:", error);
    if (error instanceof SignInWithGoogleError) {
      return c.json({ error: error.message }, 400);
    } else if (error instanceof InvalidArgumentsError) {
      return c.json({ error: error.message }, 400);
    } else if (error instanceof CreateError) {
      return c.json({ error: error.message }, 500);
    } else {
      return c.json({ error: "An unexpected error occurred" }, 500);
    }
  }
}
