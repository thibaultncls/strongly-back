import { supabase } from "@config/supabase.js";
import { SignInWithAppleError } from "../errors/sign-in-with-apple.error.js";
import type { AuthService, AuthToken } from "@features/auth/domain/services/auth.service.js";
import { SignInWithGoogleError } from "../errors/sign-in-with-google.error.js";
import { SignInWithOtpError } from "../errors/sign-in-with-otp.error.js";
import { OtpError } from "../errors/otp.error.js";
import type { Email } from "@features/auth/domain/value-object/email.vo.js";
import type { OTP } from "@features/auth/domain/value-object/otp.vo.js";

export class AuthServiceSupabase implements AuthService {
  async sendOtp(email: Email): Promise<void> {
    const { error } = await supabase.auth.signInWithOtp({
      email: email.value,
    });

    if (error) {
      throw new OtpError(`Send OTP failed: ${error.message}`);
    }
  }

  async verifyOtp(email: Email, otp: OTP): Promise<AuthToken> {
    const { data, error } = await supabase.auth.verifyOtp({
      email: email.value,
      token: otp.value,
      type: "email",
    });

    if (error) {
      throw new SignInWithOtpError(`Verify OTP failed: ${error.message}`);
    }

    if (!data || !data.session) {
      throw new SignInWithOtpError("No session data returned from Supabase");
    }

    return {
      accessToken: data.session.access_token,
      refreshToken: data.session.refresh_token,
      userId: data.session.user.id,
      email: data.session.user.email,
    };
  }

  async signInWithGoogle(token: string): Promise<AuthToken> {
    const { error, data } = await supabase.auth.signInWithIdToken({
      provider: "google",
      token: token,
    });

    if (error) {
      throw new SignInWithGoogleError(`Sign in with Google failed: ${error.message}`);
    }

    if (!data || !data.session) {
      throw new SignInWithGoogleError("No session data returned from Supabase");
    }

    return {
      accessToken: data.session.access_token,
      refreshToken: data.session.refresh_token,
      userId: data.session.user.id,
      email: data.session.user.email,
    };
  }

  async signInWithApple(token: string): Promise<AuthToken> {
    const { data, error } = await supabase.auth.signInWithIdToken({
      provider: "apple",
      token: token,
    });

    if (error) {
      throw new SignInWithAppleError(`Sign in with Apple failed: ${error.message}`);
    }

    if (!data || !data.session) {
      throw new SignInWithAppleError("No session data returned from Supabase");
    }

    return {
      accessToken: data.session.access_token,
      refreshToken: data.session.refresh_token,
      userId: data.session.user.id,
      email: data.session.user.email,
    };
  }
}
