import { supabase } from "@config/supabase.js";
import { TokenError } from "@shared/errors/TokenError.js";
import type { TokenService, UserToken } from "@shared/services/token.service.js";

export class TokenServiceSupabase implements TokenService {
  async verifyToken(token: string): Promise<UserToken> {
    const { data, error } = await supabase.auth.getUser(token);

    if (error) {
      console.error("Error verifying token:", error);
      throw TokenError.invalidToken();
    }

    if (!data.user) {
      console.warn("No user found for the provided token.");
      throw TokenError.tokenVerificationFailed();
    }

    console.log("Token verified successfully for user:", data.user.id);
    return {
      id: data.user.id,
    };
  }
}
