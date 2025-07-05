import type { User } from "../entities/user.entity.js";
import type { OTP } from "../value-object/otp.vo.js";

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
  verifyOtp(user: User, otp: OTP): Promise<AuthToken>;
}
