import type { User } from "../entities/user.entity.js";

export interface AuthToken {
  accessToken: string;
  refreshToken: string;
  userId: string;
  email?: string;
}

export interface AuthService {
  signInWithApple(token: string): Promise<AuthToken>;
  signInWithGoogle(token: string): Promise<AuthToken>;
  sendOtp(user: User): Promise<void>;
  verifyOtp(email: string, otp: string): Promise<AuthToken>;
}
