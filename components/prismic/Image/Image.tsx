import { PrismicImage } from "../../../api";

interface Props {
  className?: string | undefined;
  image: PrismicImage;
}

export default function Image(props: Props): JSX.Element {
  const { className, image } = props;
  return (
    <img className={className} src={image.url} style={{ maxWidth: "100%" }} />
  );
}
