import { ApiTimelineBlock, getTimelineBlocks, PrismicDocument } from "../api";
import Layout from "../components/Layout/Layout";
import TimelineBlock from "../components/mainPage/TimelineBlock/TimelineBlock";

import s from "./index.module.scss";

interface Props {
  textBlocks: PrismicDocument<ApiTimelineBlock>[];
}

function HomePage({ textBlocks }: Props) {
  return (
    <Layout>
      <div className={s.timelineBlocks}>
        {textBlocks.map((doc) => (
          <TimelineBlock key={doc.id} timelineBlock={doc.data} />
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
  // Call an external API endpoint to get posts
  // const res = await fetch('https://.../posts')
  // const posts = await res.json()

  const textBlocks = await getTimelineBlocks(context.locale);

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      textBlocks,
    },
  };
}

export default HomePage;
