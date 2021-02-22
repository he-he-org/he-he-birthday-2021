import { PrismicImage } from "../../../api";

interface Props {
  image: PrismicImage;
}

export default function Image(props: Props): JSX.Element {
  const { image } = props;
  return <img src={image.url} style={{ maxWidth: "100%" }} />;
}
