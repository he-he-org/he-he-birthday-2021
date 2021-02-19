import { ReactNode } from "react";

import s from "./TimelineBlock.module.scss";
import { ApiTimelineBlock } from "../../../api";

interface Props {
  timelineBlock: ApiTimelineBlock;
}

export default function TimelineBlock(props: Props) {
  const { timelineBlock } = props;
  return (
    <div className={s.root}>
      <h2 className={s.title}>{timelineBlock.title[0].text}</h2>
      <div>
        {timelineBlock.body.map(({ text }, i) => (
          <p key={i}>{text}</p>
        ))}
      </div>
    </div>
  );
}
