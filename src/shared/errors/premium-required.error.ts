export class PremiumRequiredError extends Error {
  constructor(message = "Cette action nécessite un abonnement actif") {
    super(message);

    Object.setPrototypeOf(this, PremiumRequiredError.prototype);
  }
}
