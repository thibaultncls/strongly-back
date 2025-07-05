import type { Email } from "../value-object/email.vo.js";
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
  sendOtp(email: Email): Promise<void>;
  verifyOtp(email: Email, otp: OTP): Promise<AuthToken>;
}
