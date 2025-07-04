export interface AuthToken {
  accessToken: string;
  refreshToken: string;
  userId: string;
  email?: string;
}

export interface AuthService {
  signInWithApple(token: string): Promise<AuthToken>;
  signInWithGoogle(token: string): Promise<AuthToken>;
}
