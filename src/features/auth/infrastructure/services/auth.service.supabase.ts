import { supabase } from "@config/supabase.js";
import { SignInWithAppleError } from "../errors/sign-in-with-apple.error.js";
import type { AuthService, AuthToken } from "@features/auth/domain/services/auth.service.js";
import { SignInWithGoogleError } from "../errors/sign-in-with-google.error.js";
import { SignInWithPasswordError } from "../errors/sign-in-with-password.error.js";

export class AuthServiceSupabase implements AuthService {
  async signUpWithEmailAndPassword(email: string, password: string): Promise<AuthToken> {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      throw new SignInWithPasswordError(`Sign up with email and password failed: ${error.message}`);
    }

    if (!data || !data.session) {
      throw new SignInWithPasswordError("No session data returned from Supabase");
    }

    return {
      accessToken: data.session.access_token,
      refreshToken: data.session.refresh_token,
      userId: data.session.user.id,
      email: data.session.user.email,
    };
  }

  async signInWithEmailAndPassword(email: string, password: string): Promise<AuthToken> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      throw new SignInWithPasswordError(`Sign in with email and password failed: ${error.message}`);
    }

    if (!data || !data.session) {
      throw new SignInWithPasswordError("No session data returned from Supabase");
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
