import {
  ApiIntro,
  ApiTimelineBlock,
  getIntroBlock,
  getTimelineBlocks,
  PrismicDocument,
} from "../api";
import Layout from "../components/Layout/Layout";
import TimelineBlock from "../components/mainPage/TimelineBlock/TimelineBlock";

import s from "./index.module.scss";
import Intro from "../components/mainPage/Intro/Intro";

interface Props {
  intro: PrismicDocument<ApiIntro>;
  textBlocks: PrismicDocument<ApiTimelineBlock>[];
}

function HomePage({ intro, textBlocks }: Props) {
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

  return {
    props: {
      intro,
      textBlocks,
    },
  };
}

export default HomePage;
