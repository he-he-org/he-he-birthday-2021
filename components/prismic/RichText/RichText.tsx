import PrismicDOM from "prismic-dom";
import cn from "clsx";
import s from "./RichText.module.scss";
import { PrismicRichText } from "../../../api";

interface Props {
  text: PrismicRichText;
  className?: string | null | undefined;
}

const linkResolver = function () {
  return "/#unresolved-link";
};

export default function RichText(props: Props): JSX.Element {
  const { text, className } = props;
  return (
    <div
      className={cn(s.root, className)}
      dangerouslySetInnerHTML={{
        __html: PrismicDOM.RichText.asHtml(text, linkResolver),
      }}
    />
  );
}
