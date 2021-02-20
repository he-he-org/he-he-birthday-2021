import NextImage, { ImageProps } from "next/image";
import { PrismicImage } from "../../../api";

interface Props {
  image: PrismicImage;
}

export default function Image(props: Props): JSX.Element {
  const { image, ...rest } = props;
  return (
    <NextImage
      width={image.dimensions.width}
      height={image.dimensions.height}
      src={image.url}
    />
  );
}
