import { ApiIntro } from "../../../api";
import RichText from "../../prismic/RichText/RichText";

import s from "./Intro.module.scss";
import Title from "../../prismic/Title/Title";

interface Props {
  intro: ApiIntro;
}

export default function Intro(props: Props): JSX.Element {
  const { intro } = props;
  return (
    <div className={s.root}>
      <div className={s.left}>
        <img width={462} height={318} src="/intro_image.svg" />
        <div className={s.logo}>
          <img width={328} height={85} src="/logo.svg" />
        </div>
        <button className={s.donateButton}>
          <Title text={intro.donate_button} />
        </button>
      </div>
      <div className={s.right}>
        <h1 className={s.title}>
          <Title text={intro.title} />
        </h1>
        <RichText className={s.body} text={intro.body_1} />
        <RichText className={s.body2} text={intro.body_2} />
      </div>
    </div>
  );
}