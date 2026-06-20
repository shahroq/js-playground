export function resolveImgPath(
  image?: string | null,
  basePath = "/img",
  defaultImg = "no-img.png",
) {
  return `${basePath}/${image ?? defaultImg}`;
}
