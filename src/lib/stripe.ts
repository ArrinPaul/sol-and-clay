
import { loadStripe } from '@stripe/stripe-js';

let stripePromise: Promise<import('@stripe/stripe-js').Stripe | null> | undefined;

export const getStripe = (): Promise<import('@stripe/stripe-js').Stripe | null> => {
  if (!stripePromise) {
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    if (!publishableKey) {
      throw new Error('Stripe publishable key is not set in environment variables.');
    }
    stripePromise = loadStripe(publishableKey);
  }
  return stripePromise;
};
