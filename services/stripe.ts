import { Stripe, loadStripe } from "@stripe/stripe-js";
import { STRIPE_PUBLISHABLE_KEY } from "./env";

const stripePromise: Promise<Stripe | null> = loadStripe(
  STRIPE_PUBLISHABLE_KEY
);

async function getStripe(): Promise<Stripe> {
  return stripePromise;
}

export default getStripe;
