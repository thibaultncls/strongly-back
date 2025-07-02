export interface AuthToken {
  accessToken: string;
  refreshToken: string;
  userId: string;
}

export interface AuthService {
  signInWithApple(token: string): Promise<AuthToken>;
}
