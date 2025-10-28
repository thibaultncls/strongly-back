export interface AuthRepository {
  checkIfUserExistsByUuid(uuid: string): Promise<boolean>;
  createUser(uuId: string, email?: string): Promise<void>;
  getUserCreatedAt(uuId: string): Promise<string>;
}
