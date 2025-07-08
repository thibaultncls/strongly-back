export type UserToken = {
  id: string;
  email?: string;
};

export interface TokenService {
  verifyToken(token: string): Promise<UserToken>;
}
