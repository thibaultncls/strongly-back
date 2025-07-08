import { SendOtpUseCase } from "@features/auth/application/use-cases/send-otp.usecase.js";
import { SignInWithAppleUseCase } from "@features/auth/application/use-cases/sign-in-with-apple.usecase.js";
import { SignInWithGoogleUseCase } from "@features/auth/application/use-cases/sign-in-with-google.usecase.js";
import { VerifyOtpUseCase } from "@features/auth/application/use-cases/verify-otp.usecase.js";
import type { AuthRepository } from "@features/auth/domain/repositories/auth.repository.js";
import type { AuthService } from "@features/auth/domain/services/auth.service.js";
import { AuthRepositorySupabase } from "@features/auth/infrastructure/repositories/auth.repository.supabase.js";
import { AuthServiceSupabase } from "@features/auth/infrastructure/services/auth.service.supabase.js";
import { VerifyTokenUseCase } from "@shared/application/use-case/verify-token.usecase.js";
import { TYPES } from "@shared/constants/identifier.constant.js";
import { TokenServiceSupabase } from "@shared/infrastructure/token.service.supabase.js";
import type { TokenService } from "@shared/services/token.service.js";
import { Container } from "inversify";

const container = new Container();

container.bind<AuthService>(TYPES.AUTH_SERVICE).to(AuthServiceSupabase);
container.bind<AuthRepository>(TYPES.AUTH_REPOSITORY).to(AuthRepositorySupabase);
container.bind<TokenService>(TYPES.TOKEN_SERVICE).to(TokenServiceSupabase);

container.bind<SignInWithAppleUseCase>(TYPES.SIGN_IN_WITH_APPLE_USE_CASE).toDynamicValue(() => {
  return new SignInWithAppleUseCase(container.get<AuthService>(TYPES.AUTH_SERVICE), container.get<AuthRepository>(TYPES.AUTH_REPOSITORY));
});

container.bind<SignInWithGoogleUseCase>(TYPES.SIGN_IN_WITH_GOOGLE_USE_CASE).toDynamicValue(() => {
  return new SignInWithGoogleUseCase(container.get<AuthService>(TYPES.AUTH_SERVICE), container.get<AuthRepository>(TYPES.AUTH_REPOSITORY));
});

container.bind<SendOtpUseCase>(TYPES.SEND_OTP_USE_CASE).toDynamicValue(() => {
  return new SendOtpUseCase(container.get<AuthService>(TYPES.AUTH_SERVICE));
});

container.bind<VerifyOtpUseCase>(TYPES.VERIFY_OTP_USE_CASE).toDynamicValue(() => {
  return new VerifyOtpUseCase(container.get<AuthService>(TYPES.AUTH_SERVICE), container.get<AuthRepository>(TYPES.AUTH_REPOSITORY));
});

container.bind<VerifyTokenUseCase>(TYPES.VERIFY_TOKEN_USE_CASE).toDynamicValue(() => {
  return new VerifyTokenUseCase(container.get<TokenService>(TYPES.TOKEN_SERVICE));
});

export { container };
