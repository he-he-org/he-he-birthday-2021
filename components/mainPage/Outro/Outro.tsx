import cn from "clsx";

import s from "./Outro.module.scss";
import { ApiOutro } from "../../../api";
import RichText from "../../prismic/RichText/RichText";
import Title from "../../prismic/Title/Title";

interface Props {
  outro: ApiOutro;
}

export default function Outro(props: Props) {
  const { outro } = props;
  return (
    <div className={cn(s.root)}>
      <img src="/bird.svg" />
      <div className={s.image}>
        <Title className={s.imageTitle} text={outro.image_title} />
      </div>
      <div className={s.main}>
        <RichText className={s.body} text={outro.body} />
        <div className={s.authorName}>
          <Title text={outro.author_name} />
        </div>
        <div className={s.authorDetails}>
          <Title text={outro.author_details} />
        </div>
      </div>
    </div>
  );
}
