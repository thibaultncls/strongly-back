import { zValidator } from "@hono/zod-validator";
import z from "zod";

export const SendOtpValidator = z.object({
  email: z.email("Email invalid"),
});

export const VerifyOtpValidator = z.object({
  email: z.email("Email invalid"),
  otp: z.string().length(6, "OTP must be 6 digits"),
});
