export interface AuthToken {
  accessToken: string;
  refreshToken: string;
  userId: string;
  email?: string;
}

export interface AuthService {
  signInWithApple(token: string): Promise<AuthToken>;
  signInWithGoogle(token: string): Promise<AuthToken>;
  signInWithEmailAndPassword(email: string, password: string): Promise<AuthToken>;
  signUpWithEmailAndPassword(email: string, password: string): Promise<AuthToken>;
}
