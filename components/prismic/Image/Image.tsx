import { PrismicImage } from "../../../api";

interface Props {
  image: PrismicImage;
}

export default function Image(props: Props): JSX.Element {
  const { image } = props;
  return (
    <img
      width={image.dimensions.width}
      height={image.dimensions.height}
      src={image.url}
    />
  );
}
