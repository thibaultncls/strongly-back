import { SignInWithAppleUseCase } from "@features/auth/application/use-cases/sign-in-with-apple.usecase.js";
import type { AuthService } from "@features/auth/domain/services/auth.service.js";
import { AuthServiceSupabase } from "@features/auth/infrastructure/services/auth.service.supabase.js";
import { TYPES } from "@shared/constants/identifier.constant.js";
import { Container } from "inversify";

const container = new Container();

container.bind<AuthService>(TYPES.AUTH_REPOSITORY).to(AuthServiceSupabase);

container
  .bind<SignInWithAppleUseCase>(TYPES.SIGN_IN_WITH_APPLE_USE_CASE)
  .toDynamicValue(() => {
    return new SignInWithAppleUseCase(
      container.get<AuthService>(TYPES.AUTH_REPOSITORY)
    );
  });

export { container };
