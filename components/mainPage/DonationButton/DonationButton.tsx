import cn from "clsx";

import s from "./DonationButton.module.scss";
import { ApiDonation } from "../../../api";
import RichText from "../../prismic/RichText/RichText";
import Image from "../../prismic/Image/Image";
import Title from "../../prismic/Title/Title";
import getStripe from "../../../services/stripe";

interface Props {
  donation: ApiDonation;
  onClick: (cents: number) => void;
}

export default function DonationButton(props: Props) {
  const { onClick, donation } = props;
  return (
    <button
      className={cn(s.root)}
      onClick={() => {
        onClick(donation.amount);
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
