import { Image, Level } from "components/interfaces";

export const shuffledImagesMemoBlocks = (
  selectedLevel: Level,
  images: Image[]
) => {
  const { row, col } = selectedLevel;
  const shuffledImages = getImages(row, col, images);

  const sortedImages = sortImages(shuffledImages);
  const shuffledMemoBlocks = sortedImages.map((image, i) => ({
    index: i,
    image,
    flipped: false,
  }));

  return shuffledMemoBlocks;
};

function getImages(rows: number, cols: number, images: Image[]): Image[] {
  const totalImages = (rows * cols) / 2;
  let shuffledImages = images.slice(0, totalImages);
  const duplicatedImages = shuffledImages.flatMap((image) => [image, image]);
  const sortedImages = sortImages(duplicatedImages);
  return sortedImages;
}

function sortImages(images: Image[]) {
  return images.slice().sort(() => 0.5 - Math.random());
}
