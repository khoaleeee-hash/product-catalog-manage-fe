export const resolveImageUrl = (url?: string | null) => {
  if (!url) {
    return "/images/no-image.png"; // ảnh fallback
  }

  if (url.startsWith("http")) return url;

  return url;
};
