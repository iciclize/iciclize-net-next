export function normalizeMarkdownHref(href: string) {
  if (href.startsWith("../posts/")) {
    return href.replace("../posts/", "/posts/");
  }

  if (href === "../works") {
    return "/works";
  }

  if (href.startsWith("../works/")) {
    return href.replace("../works/", "/works/");
  }

  if (href.startsWith("../tags/")) {
    return href.replace("../tags/", "/tags/");
  }

  return href;
}

export function resolveMarkdownImageSrc(src: string, baseAssetPath?: string) {
  if (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("data:")) {
    return src;
  }

  if (src.startsWith("/uploads/")) {
    return `/strapi-uploads/${src.slice("/uploads/".length)}`;
  }

  if (src.startsWith("uploads/")) {
    return `/strapi-uploads/${src.slice("uploads/".length)}`;
  }

  if (src.startsWith("./") && baseAssetPath) {
    return `${baseAssetPath}/${src.slice(2)}`;
  }

  if (
    baseAssetPath &&
    !src.startsWith("/") &&
    !src.startsWith("#") &&
    !src.startsWith("../")
  ) {
    return `${baseAssetPath}/${src}`;
  }

  return src;
}

export function formatIsoDate(value?: string | null) {
  if (!value) {
    return "";
  }

  return value.slice(0, 10);
}
