export const resolveImageUrl = (url: string) => {
  if (url.startsWith("http")) return url;
  return `http://localhost:8080${url}`;
};