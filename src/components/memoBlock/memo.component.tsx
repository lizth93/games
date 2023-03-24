import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import cloneDeep from "lodash.clonedeep";
import { AppDispatch } from "store";
import { getImages } from "store/getImages";
import { Props, Image, Level } from "components/interfaces";
import { RootState } from "store/imagesSlice";
import Blocks from "components/blocks";
import RadioButtons from "components/radioButtons";
import Title from "components/title";
import { shuffleImageMemoryBlocks } from "helpers/shuffleImageMemoryBlocks";

interface MemoBlock {
  index: number;
  image: Image;
  flipped: boolean;
}
type MemoBlocks = MemoBlock[];

const levels = ["3*4", "4*4", "4*5", "4*6", "4*7", "4*8"];

function MemoBlockComponent(props: Props): JSX.Element {
  const dispatch: AppDispatch = useDispatch<AppDispatch>();
  const [shuffledMemoBlocks, setShuffledMemoBlocks] = useState<MemoBlocks>([]);
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
    if (images) {
      setShuffledMemoBlocks(shuffleImageMemoryBlocks(selectedLevel, images));
    }
  }, [images, selectedLevel]);

  if (isLoadingImages) {
    return <p>Please Wait</p>;
  }

  function handleClick(memoBlock: MemoBlock) {
    setShuffledMemoBlocks(
      getSetWithMemoBlock(shuffledMemoBlocks, asFlipped(memoBlock))
    );

    if (noneSelection()) {
      setSelectedBlock(memoBlock);
    } else if (equalSelection()) {
      // Pair selected, no need to keep tracking on it anymore.
      setSelectedBlock(null);
    } else {
      flipAndResetSelection();
    }

    function getSetWithMemoBlock(memoBlocks: MemoBlocks, memoBlock: MemoBlock) {
      memoBlocks = cloneDeep(memoBlocks);
      memoBlocks.splice(memoBlock.index, 1, memoBlock);

      return memoBlocks;
    }

    function asFlipped(memoBlock: MemoBlock) {
      memoBlock = cloneDeep(memoBlock);
      memoBlock.flipped = true;

      return memoBlock;
    }

    function asNotFlipped(memoBlock: MemoBlock) {
      memoBlock = asFlipped(memoBlock);
      memoBlock.flipped = false;

      return memoBlock;
    }

    function noneSelection() {
      return selectedBlock === null || !selectedBlock;
    }

    function equalSelection() {
      return selectedBlock && selectedBlock.image.id === memoBlock.image.id;
    }

    function flipAndResetSelection() {
      setAnimating(true);

      setTimeout(() => {
        if (selectedBlock) {
          let memoBlocksWithSelectionFlipped = getSetWithMemoBlock(
            shuffledMemoBlocks,
            asNotFlipped(memoBlock)
          );
          memoBlocksWithSelectionFlipped = getSetWithMemoBlock(
            memoBlocksWithSelectionFlipped,
            asNotFlipped(selectedBlock)
          );

          setShuffledMemoBlocks(memoBlocksWithSelectionFlipped);
          setSelectedBlock(null);
          setAnimating(false);
        }
      }, 1000);
    }
  }

  function handleSelectionLevels(level: string) {
    const [row, col] = level.split("*");
    const levels = {
      row: parseInt(row),
      col: parseInt(col),
    };
    setSelectedLevel(levels);
  }

  const gridTemplateColumns = `repeat(${selectedLevel.col}, 1fr)`;
  const gridTemplateRows = `repeat(${selectedLevel.row}, 1fr)`;

  return (
    <div className={props.className}>
      <Title>MemoBlocks Game!</Title>
      <h2 className="levels-title"> Select level:</h2>
      <RadioButtons levels={levels} onClick={handleSelectionLevels} />

      <div
        className="content"
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
export default MemoBlockComponent;
