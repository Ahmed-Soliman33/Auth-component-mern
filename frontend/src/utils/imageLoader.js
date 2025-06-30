const images = import.meta.glob("/src/assets/*", { eager: true, as: "url" });

export function getImageUrl(fileName) {
  const entry = Object.entries(images).find(([path]) =>
    path.endsWith(`/${fileName}`),
  );
  return entry ? entry[1] : undefined;
}
