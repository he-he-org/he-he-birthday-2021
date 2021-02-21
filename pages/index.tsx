import {
  ApiIntro,
  ApiOutro,
  ApiTimelineBlock,
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

interface Props {
  intro: PrismicDocument<ApiIntro>;
  outro: PrismicDocument<ApiOutro>;
  textBlocks: PrismicDocument<ApiTimelineBlock>[];
}

function HomePage({ intro, outro, textBlocks }: Props) {
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

  console.log("outro", outro);

  return {
    props: {
      intro,
      outro,
      textBlocks,
    },
  };
}

export default HomePage;
