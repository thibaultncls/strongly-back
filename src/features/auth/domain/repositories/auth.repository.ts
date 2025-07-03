export interface AuthRepository {
  checkIfUserExistsByUuid(uuId: string): Promise<boolean>;
}
