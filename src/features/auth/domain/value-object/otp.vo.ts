import { OtpError } from "@features/auth/infrastructure/errors/otp.error.js";

export class OTP {
  private readonly otp: string;

  constructor(otp: string) {
    if (!this.isValidOtp(otp)) {
      throw new OtpError("Invalid OTP format");
    }
    this.otp = otp;
  }

  private isValidOtp(otp: string): boolean {
    const otpRegex = /^\d{6}$/; // Checks for a 6-digit numeric OTP
    return otpRegex.test(otp);
  }

  public get value(): string {
    return this.otp;
  }
}
