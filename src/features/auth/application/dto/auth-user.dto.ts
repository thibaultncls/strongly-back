export interface AuthUserDto {
  userId: string;
  email?: string;
  createdAt: string;
  accessToken: string;
  refreshToken: string;
}
