export type UserToken = {
  id: string;
};

export interface TokenService {
  verifyToken(token: string): Promise<UserToken>;
}
