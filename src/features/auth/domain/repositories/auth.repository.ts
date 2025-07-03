export interface AuthRepository {
  checkIfUserExistsByUuid(uuId: string): Promise<boolean>;
  createUser(uuId: string, email?: string): Promise<void>;
}
