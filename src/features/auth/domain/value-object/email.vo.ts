export class Email {
  private readonly email: string;

  constructor(email: string) {
    if (!this.isValidEmail(email)) {
      throw new Error("Invalid email format");
    }
    this.email = email.toLowerCase();
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  public get value(): string {
    return this.email;
  }
}
