import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "store";
import { getImages } from "store/getImages";
import { Props, Image } from "components/interfaces";
import { RootState } from "store/imagesSlice";
import Blocks from "components/blocks";
import RadioButtons from "components/radioButtons";

interface Level {
  row: number;
  col: number;
}

function MemoBlock(props: Props): JSX.Element {
  const dispatch: AppDispatch = useDispatch<AppDispatch>();
  const [shuffledMemoBlocks, setShuffledMemoBlocks] = useState<
    { index: number; image: Image; flipped: boolean }[]
  >([]);
  const [selectedLevel, setSelectedLevel] = useState<Level>({ row: 4, col: 8 });
  const [selectedBlock, setSelectedBlock] = useState<{
    index: number;
    image: Image;
    flipped: boolean;
  } | null>(null);
  const [isAnimating, setAnimating] = useState(false);

  useEffect(() => {
    dispatch(getImages());
  }, [dispatch]);

  const { images, isLoadingImages } = useSelector((state: RootState) => ({
    images: state.imagesCollection.images,
    isLoadingImages: state.imagesCollection.isLoadingImages,
  }));

  useEffect(() => {
    function getImages(rows: number, cols: number): Image[] {
      const totalImages = (rows * cols) / 2;
      let shuffledImages = images
        .slice()
        .sort(() => 0.5 - Math.random())
        .slice(0, totalImages);
      const duplicatedImages = [...shuffledImages, ...shuffledImages];
      return duplicatedImages;
    }

    if (images) {
      const { row, col } = selectedLevel;
      const shuffledImages = getImages(row, col)
        .slice()
        .sort(() => 0.5 - Math.random());
      setShuffledMemoBlocks(
        shuffledImages.map((image, i) => ({ index: i, image, flipped: false }))
      );
    }
  }, [images, selectedLevel]);

  if (isLoadingImages) {
    return <p>Please Wait</p>;
  }

  function handleClick(memoBlock: {
    index: number;
    image: Image;
    flipped: boolean;
  }) {
    const flippedBlock = { ...memoBlock, flipped: true };
    let shuffledMemoBlockDuplicated = [...shuffledMemoBlocks];
    shuffledMemoBlockDuplicated.splice(memoBlock.index, 1, flippedBlock);
    setShuffledMemoBlocks(shuffledMemoBlockDuplicated);

    if (selectedBlock === null || !selectedBlock) {
      setSelectedBlock(memoBlock);
    } else if (selectedBlock && selectedBlock.image === memoBlock.image) {
      setSelectedBlock(null);
    } else {
      setAnimating(true);

      setTimeout(() => {
        if (selectedBlock) {
          shuffledMemoBlockDuplicated.splice(memoBlock.index, 1, memoBlock);
          shuffledMemoBlockDuplicated.splice(
            selectedBlock.index,
            1,
            selectedBlock
          );
          setShuffledMemoBlocks(shuffledMemoBlockDuplicated);
          setSelectedBlock(null);
          setAnimating(false);
        }
      }, 1000);
    }
  }

  const levels = ["3*4", "4*4", "4*5", "4*6", "4*7", "4*8"];

  const parseLevel = (level: string) => {
    const [row, col] = level.split("*");
    return {
      row: parseInt(row),
      col: parseInt(col),
    };
  };

  const handleSelectionLevels = (levels: string) => {
    const convertedLevel = parseLevel(levels);
    setSelectedLevel(convertedLevel);
  };

  const gridTemplateColumns = `repeat(${selectedLevel.col}, 1fr)`;
  const gridTemplateRows = `repeat(${selectedLevel.row}, 1fr)`;

  return (
    <div className="ppal-container">
      <RadioButtons levels={levels} onClick={handleSelectionLevels} />
      <div
        className={`${props.className} content`}
        style={{ gridTemplateColumns, gridTemplateRows }}
      >
        <Blocks
          memoBlocks={shuffledMemoBlocks}
          animating={isAnimating}
          handleClick={handleClick}
        />
      </div>
    </div>
  );
}
export default MemoBlock;
