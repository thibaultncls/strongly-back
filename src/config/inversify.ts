import { GetCurrentUserUseCase } from "@features/auth/application/use-cases/get-current-user.usecase.js";
import { RefreshTokenUseCase } from "@features/auth/application/use-cases/refresh-token.usecase.js";
import { SendOtpUseCase } from "@features/auth/application/use-cases/send-otp.usecase.js";
import { SignInWithAppleUseCase } from "@features/auth/application/use-cases/sign-in-with-apple.usecase.js";
import { SignInWithGoogleUseCase } from "@features/auth/application/use-cases/sign-in-with-google.usecase.js";
import { VerifyOtpUseCase } from "@features/auth/application/use-cases/verify-otp.usecase.js";
import type { AuthRepository } from "@features/auth/domain/repositories/auth.repository.js";
import type { AuthService } from "@features/auth/domain/services/auth.service.js";
import { AuthRepositorySupabase } from "@features/auth/infrastructure/repositories/auth.repository.supabase.js";
import { AuthServiceSupabase } from "@features/auth/infrastructure/services/auth.service.supabase.js";

import { GetNonSyncDataUseCase } from "@features/sync/application/use-cases/get-non-sync-data.usecase.js";
import { SyncClientDataUseCase } from "@features/sync/application/use-cases/sync-client-data.usecase.js";
import type { SyncRepository } from "@features/sync/domain/repositories/sync.repository.js";
import { SyncRepositoryPrisma } from "@features/sync/infrastructure/repositories/sync.repository.prisma.js";
import { VerifyTokenUseCase } from "@shared/application/use-case/verify-token.usecase.js";
import { TYPES } from "@shared/constants/identifier.constant.js";
import { TokenServiceSupabase } from "@shared/infrastructure/token.service.supabase.js";
import type { TokenService } from "@shared/services/token.service.js";
import { Container } from "inversify";

const container = new Container();

container.bind<AuthService>(TYPES.AUTH_SERVICE).to(AuthServiceSupabase);
container.bind<AuthRepository>(TYPES.AUTH_REPOSITORY).to(AuthRepositorySupabase);
container.bind<TokenService>(TYPES.TOKEN_SERVICE).to(TokenServiceSupabase);
container.bind<SyncRepository>(TYPES.SYNC_REPOSITORY).to(SyncRepositoryPrisma);

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

container.bind<RefreshTokenUseCase>(TYPES.REFRESH_TOKEN_USE_CASE).toDynamicValue(() => {
  return new RefreshTokenUseCase(container.get<AuthService>(TYPES.AUTH_SERVICE));
});

container.bind<GetCurrentUserUseCase>(TYPES.GET_CURRENT_USER_USE_CASE).toDynamicValue(() => {
  return new GetCurrentUserUseCase(container.get<AuthService>(TYPES.AUTH_SERVICE));
});

container.bind<GetNonSyncDataUseCase>(TYPES.GET_NON_SYNC_DATA_USE_CASE).toDynamicValue(() => {
  return new GetNonSyncDataUseCase(container.get<SyncRepository>(TYPES.SYNC_REPOSITORY));
});

container.bind<SyncClientDataUseCase>(TYPES.SYNC_CLIENT_DATA_USE_CASE).toDynamicValue(() => {
  return new SyncClientDataUseCase(container.get<SyncRepository>(TYPES.SYNC_REPOSITORY));
});

export { container };
