import {
  ApiDonation,
  ApiIntro,
  ApiOutro,
  ApiTimelineBlock,
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

interface Props {
  intro: PrismicDocument<ApiIntro>;
  outro: PrismicDocument<ApiOutro>;
  textBlocks: PrismicDocument<ApiTimelineBlock>[];
  donations: PrismicDocument<ApiDonation>[];
}

function HomePage({ intro, outro, textBlocks, donations }: Props) {
  return (
    <Layout>
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
      <div className={s.donations}>
        {donations.map((donation) => (
          <DonationButton key={donation.id} donation={donation.data} />
        ))}
      </div>
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

  return {
    props: {
      intro,
      outro,
      textBlocks,
      donations,
    },
  };
}

export default HomePage;
