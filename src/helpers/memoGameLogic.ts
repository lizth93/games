import cloneDeep from "lodash.clonedeep";
import { Image } from "components/interfaces";

interface MemoBlock {
  index: number;
  image: Image;
  flipped: boolean;
}
type MemoBlocks = MemoBlock[];

interface Props {
  memoBlock: MemoBlock;
  shuffledMemoBlocks: MemoBlocks;
  selectedBlock: MemoBlock | null;
  setSelectedBlock: React.Dispatch<React.SetStateAction<MemoBlock | null>>;
  setShuffledMemoBlocks: React.Dispatch<React.SetStateAction<MemoBlocks>>;
  setAnimating: React.Dispatch<React.SetStateAction<boolean>>;
}

function memoGameLogic({
  memoBlock,
  shuffledMemoBlocks,
  selectedBlock,
  setSelectedBlock,
  setShuffledMemoBlocks,
  setAnimating,
}: Props) {
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

export default memoGameLogic;
