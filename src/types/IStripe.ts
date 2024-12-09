export interface IStripeObject {
  id: string;
}

export interface IStripeCheckoutSessionDetails {
  status: 'open' | 'complete' | 'expired';
  amount: number;
  invoice: string;
  url: string;
}
