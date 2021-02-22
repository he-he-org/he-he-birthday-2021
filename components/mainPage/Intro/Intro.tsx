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
      <img src="/intro_image.svg" className={s.image} />
      <img src="/logo.svg" className={s.logo} />
      <a href="#donations" className={s.donateButton}>
        <Title text={intro.donate_button} />
      </a>
      <div className={s.text}>
        <h1 className={s.title}>
          <Title text={intro.title} />
        </h1>
        <RichText className={s.body} text={intro.body_1} />
      </div>
      <RichText className={s.body2} text={intro.body_2} />
    </div>
  );
}
