import { container } from "@config/inversify.js";
import type { RefreshTokenUseCase } from "@features/auth/application/use-cases/refresh-token.usecase.js";
import type { SendOtpUseCase } from "@features/auth/application/use-cases/send-otp.usecase.js";
import { SignInWithAppleUseCase } from "@features/auth/application/use-cases/sign-in-with-apple.usecase.js";
import type { SignInWithGoogleUseCase } from "@features/auth/application/use-cases/sign-in-with-google.usecase.js";
import type { VerifyOtpUseCase } from "@features/auth/application/use-cases/verify-otp.usecase.js";
import { EmailError } from "@features/auth/domain/errors/email.error.js";
import { OtpError } from "@features/auth/infrastructure/errors/otp.error.js";
import { RefreshTokenError } from "@features/auth/infrastructure/errors/refresh-token.error.js";
import { SignInWithAppleError } from "@features/auth/infrastructure/errors/sign-in-with-apple.error.js";
import { SignInWithGoogleError } from "@features/auth/infrastructure/errors/sign-in-with-google.error.js";
import { SignInWithOtpError } from "@features/auth/infrastructure/errors/sign-in-with-otp.error.js";
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

export async function sendOtp(c: Context) {
  const { email } = await c.req.json();
  console.log("Received email for OTP:", email);

  try {
    const sendOtpUseCase = container.get<SendOtpUseCase>(TYPES.SEND_OTP_USE_CASE);
    await sendOtpUseCase.execute(email);
    return c.json({ message: "OTP sent successfully" });
  } catch (error: any) {
    console.error("Error sending OTP:", error);
    if (error instanceof InvalidArgumentsError) {
      return c.json({ error: error.message }, 400);
    } else if (error instanceof OtpError) {
      return c.json({ error: error.message }, 500);
    } else {
      return c.json({ error: "An unexpected error occurred" }, 500);
    }
  }
}

export async function verifyOtp(c: Context) {
  const { email, otp } = await c.req.json();
  console.log("Received email and OTP for verification:", email, otp);

  try {
    const verifyOtpUseCase = container.get<VerifyOtpUseCase>(TYPES.VERIFY_OTP_USE_CASE);
    const authToken = await verifyOtpUseCase.execute({ email, otp });

    console.log("Auth token after OTP verification:", authToken);
    return c.json({
      accessToken: authToken.accessToken,
      refreshToken: authToken.refreshToken,
      userId: authToken.userId,
      email: authToken.email,
    });
  } catch (error: any) {
    console.error("Error verifying OTP:", error);
    if (error instanceof SignInWithOtpError) {
      return c.json({ error: error.message }, 400);
    } else if (error instanceof InvalidArgumentsError || error instanceof EmailError || error instanceof OtpError) {
      return c.json({ error: error.message }, 400);
    } else if (error instanceof CreateError) {
      return c.json({ error: error.message }, 500);
    } else {
      return c.json({ error: "An unexpected error occurred" }, 500);
    }
  }
}

export async function refreshToken(c: Context) {
  const { refreshToken } = await c.req.json();

  try {
    const useCase = container.get<RefreshTokenUseCase>(TYPES.REFRESH_TOKEN_USE_CASE);
    const authToken = await useCase.execute({ refreshToken });

    return c.json({
      accessToken: authToken.accessToken,
      refreshToken: authToken.refreshToken,
      userId: authToken.userId,
      email: authToken.email,
    });
  } catch (error: any) {
    console.error("Error refreshing token:", error);
    if (error instanceof InvalidArgumentsError) {
      return c.json({ error: error.message }, 400);
    } else if (error instanceof RefreshTokenError) {
      return c.json({ error: error.message }, 500);
    } else {
      return c.json({ error: "An unexpected error occurred" }, 500);
    }
  }
}
