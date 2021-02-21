import { format } from "date-fns";
import cn from "clsx";

import s from "./DonationButton.module.scss";
import { ApiDonation, ApiTimelineBlock } from "../../../api";
import RichText from "../../prismic/RichText/RichText";
import Image from "../../prismic/Image/Image";
import { useDateFnsLocale } from "../../../services/i18n/dateFns";
import Title from "../../prismic/Title/Title";

interface Props {
  donation: ApiDonation;
}

export default function DonationButton(props: Props) {
  const { donation } = props;
  console.log("timelineBlock", donation);
  const locale = useDateFnsLocale();
  return (
    <button className={cn(s.root)}>
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
