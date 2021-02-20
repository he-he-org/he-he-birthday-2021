import PrismicDOM from "prismic-dom";
import cn from "clsx";
import s from "./Title.module.scss";
import { PrismicTitle } from "../../../api";

interface Props {
  text: PrismicTitle;
  className?: string | null | undefined;
}

export default function Title(props: Props): JSX.Element {
  const { text, className } = props;
  return (
    <span className={cn(s.root, className)}>
      {text.map(({ text }) => text).join("; ")}
    </span>
  );
}
