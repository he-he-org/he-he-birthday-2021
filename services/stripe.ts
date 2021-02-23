// import { Stripe, loadStripe } from "@stripe/stripe-js";
// import { STRIPE_PUBLISHABLE_KEY } from "./env";

// const stripePromise: Promise<Stripe | null> = loadStripe(
//   STRIPE_PUBLISHABLE_KEY
// );

async function getStripe(): Promise<any> {
  // return stripePromise;
}

export async function initPayment(amount: number) {
  // const stripe = await getStripe();
  //
  // const response = await fetch("/.netlify/functions/payment", {
  //   method: "POST",
  //   body: JSON.stringify({ amount: Math.round(amount * 100) }),
  // });
  // const { sessionId } = await response.json();
  // const result = await stripe.redirectToCheckout({ sessionId });
  // if (result.error) {
  //   throw new Error(result.error.message);
  // }
}

export default getStripe;
