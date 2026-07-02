import { use, type ComponentProps } from "react";

type Props = ComponentProps<"img">;

const imgCache = new Map<string, Promise<string>>();

function preloadImage(src: string) {
  return new Promise<string>((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(src);
    img.onerror = reject;
  });
}

function imgSrc(src: string) {
  const imgPromise = imgCache.get(src) ?? preloadImage(src);
  imgCache.set(src, imgPromise);

  return imgPromise;
}

export function Img({ src, ...props }: Props) {
  if (!src) return null;

  src = use(imgSrc(src));

  return <img src={src} {...props} />;
}
