export interface AuthRepository {
  signInWithApple: () => Promise<string>;
}
