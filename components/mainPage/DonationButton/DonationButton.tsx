import { format } from "date-fns";
import cn from "clsx";
import { Stripe } from "@stripe/stripe-js";

import s from "./DonationButton.module.scss";
import { ApiDonation, ApiTimelineBlock } from "../../../api";
import RichText from "../../prismic/RichText/RichText";
import Image from "../../prismic/Image/Image";
import { useDateFnsLocale } from "../../../services/i18n/dateFns";
import Title from "../../prismic/Title/Title";
import getStripe from "../../../services/stripe.ts";

interface Props {
  donation: ApiDonation;
}

export default function DonationButton(props: Props) {
  const { donation } = props;
  return (
    <button
      className={cn(s.root)}
      onClick={() => {
        (async () => {
          const stripe = await getStripe();

          // Create a new Checkout Session using the server-side endpoint you
          // created in step 3.
          fetch("/.netlify/functions/payment", {
            method: "POST",
          })
            .then(function (response) {
              return response.json();
            })
            .then(function ({ sessionId }) {
              return stripe.redirectToCheckout({ sessionId });
            })
            .then(function (result) {
              // If `redirectToCheckout` fails due to a browser or network
              // error, you should display the localized error message to your
              // customer using `error.message`.
              if (result.error) {
                alert(result.error.message);
              }
            })
            .catch(function (error) {
              console.error("Error:", error);
            });

          //
          // const params: Stripe.Checkout.SessionCreateParams = {
          //   submit_type: "donate",
          //   payment_method_types: ["card"],
          //   line_items: [
          //     {
          //       name: "Custom amount donation",
          //       amount: formatAmountForStripe(amount, CURRENCY),
          //       currency: CURRENCY,
          //       quantity: 1,
          //     },
          //   ],
          //   success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
          //   cancel_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
          // };
          // const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.create(
          //   params
          // );

          // const params = {
          //   submit_type: "donate",
          //   payment_method_types: ["card"],
          //   line_items: [
          //     {
          //       name: "Custom amount donation",
          //       amount: formatAmountForStripe(amount, CURRENCY),
          //       currency: CURRENCY,
          //       quantity: 1,
          //     },
          //   ],
          //   success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
          //   cancel_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
          // };
          // const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.create(
          //   params
          // );

          // ...
        })().catch((e) => {
          console.error(e);
        });
      }}
    >
      <div className={s.top}>
        <Image image={donation.image} />
        <h3 className={s.title}>
          <Title text={donation.title} />
        </h3>
        <RichText className={s.details} text={donation.details} />
      </div>
      <div className={s.bottom}>
        <div className={s.button}>${donation.amount}</div>
      </div>
    </button>
  );
}
