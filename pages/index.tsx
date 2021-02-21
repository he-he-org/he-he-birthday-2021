import {
  ApiDonateModal,
  ApiDonation,
  ApiIntro,
  ApiOutro,
  ApiTimelineBlock,
  getDonateModal,
  getDonations,
  getIntroBlock,
  getOutroBlock,
  getTimelineBlocks,
  PrismicDocument,
} from "../api";
import Layout from "../components/Layout/Layout";
import TimelineBlock from "../components/mainPage/TimelineBlock/TimelineBlock";

import s from "./index.module.scss";
import Intro from "../components/mainPage/Intro/Intro";
import Outro from "../components/mainPage/Outro/Outro";
import DonationButton from "../components/mainPage/DonationButton/DonationButton";
import getStripe from "../services/stripe";
import Title from "../components/prismic/Title/Title";
import { useState } from "react";
import DonateModal from "../components/mainPage/DonateModal/DonateModal.tsx";

interface Props {
  intro: PrismicDocument<ApiIntro>;
  outro: PrismicDocument<ApiOutro>;
  textBlocks: PrismicDocument<ApiTimelineBlock>[];
  donations: PrismicDocument<ApiDonation>[];
  donateModal: PrismicDocument<ApiDonateModal>;
}

function HomePage({ intro, outro, textBlocks, donations, donateModal }: Props) {
  const [showAmountModal, setShowAmountModal] = useState(false);
  const [amount, setAmount] = useState<number | null>(null);

  function handleInitDonate(amount: number | null) {
    setShowAmountModal(true);
    setAmount(amount);
  }

  return (
    <Layout>
      {showAmountModal && (
        <DonateModal
          amount={amount}
          donateModal={donateModal.data}
          onClose={() => {
            setShowAmountModal(false);
          }}
        />
      )}
      <Intro intro={intro.data} />
      <div className={s.timelineBlocks}>
        {textBlocks.map((doc, i) => (
          <TimelineBlock
            imagePosition={i % 2 === 0 ? "RIGHT" : "LEFT"}
            key={doc.id}
            timelineBlock={doc.data}
          />
        ))}
      </div>
      <Outro outro={outro.data} />
      <div className={s.donations} id="donations">
        <div className={s.donationButtons}>
          {donations.map((donation) => (
            <DonationButton
              onClick={handleInitDonate}
              key={donation.id}
              donation={donation.data}
            />
          ))}
        </div>
        <button
          className={s.customDonateButton}
          onClick={() => {
            handleInitDonate(null);
          }}
        >
          <Title text={donateModal.data.custom_donate_button} />
        </button>
      </div>
      <img className={s.footerPicture} src="/footer_picture.svg" />
    </Layout>
  );
}

// This function gets called at build time
export async function getStaticProps(
  context
): Promise<{
  props: Props;
}> {
  const textBlocks = await getTimelineBlocks(context.locale);
  const intro = await getIntroBlock(context.locale);
  const outro = await getOutroBlock(context.locale);
  const donations = await getDonations(context.locale);
  const donateModal = await getDonateModal(context.locale);

  return {
    props: {
      intro,
      outro,
      textBlocks,
      donations,
      donateModal,
    },
  };
}

export default HomePage;
