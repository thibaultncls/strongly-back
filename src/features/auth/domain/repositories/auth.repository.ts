export interface AuthRepository {
  checkIfUserExistsByUuid(uuid: string): Promise<boolean>;
  checkIfUserExistsByEmail(email: string): Promise<boolean>;
  createUser(uuId: string, email?: string): Promise<void>;
}
