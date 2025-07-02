export class SignInWithAppleError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SignInWithAppleError";
  }
}
