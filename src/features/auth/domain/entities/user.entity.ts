import { Email } from "../value-object/email.vo.js";

export class User {
  public readonly email: Email;

  constructor(email: Email) {
    this.email = email;
  }
}
