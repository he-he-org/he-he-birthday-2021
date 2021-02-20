import { format } from "date-fns";
import cn from "clsx";

import s from "./TimelineBlock.module.scss";
import { ApiTimelineBlock } from "../../../api";
import RichText from "../../prismic/RichText/RichText";
import Image from "../../prismic/Image/Image";
import { useDateFnsLocale } from "../../../services/i18n/dateFns";
import NextImage from "next/image";
import Title from "../../prismic/Title/Title";

interface Props {
  timelineBlock: ApiTimelineBlock;
  imagePosition: "LEFT" | "RIGHT";
}

export default function TimelineBlock(props: Props) {
  const { imagePosition, timelineBlock } = props;
  const locale = useDateFnsLocale();
  return (
    <div className={cn(s.root, s[`imagePosition-${imagePosition}`])}>
      <div className={s.image}>
        <Image image={timelineBlock.image} />
      </div>
      <div className={s.main}>
        <Image image={timelineBlock.small_title_image} />
        <h2 className={s.date}>
          {format(new Date(timelineBlock.date), "LLLL yyyy", {
            locale: locale,
          })}
        </h2>
        <h2 className={s.title}>{timelineBlock.title[0].text}</h2>
        <RichText className={s.body} text={timelineBlock.body} />
        <div className={s.authorName}>
          <Title text={timelineBlock.author_name} />,
        </div>
        <div className={s.authorDetails}>
          <Title text={timelineBlock.author_details} />
        </div>
      </div>
    </div>
  );
}
