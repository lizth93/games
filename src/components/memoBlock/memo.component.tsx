import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "store";
import { getImages } from "store/getImages";
import { Props, Image, Level } from "components/interfaces";
import { RootState } from "store/imagesSlice";
import Blocks from "components/blocks";
import RadioButtons from "components/radioButtons";
import Title from "components/title";
import { shuffleImageMemoryBlocks } from "helpers/shuffleImageMemoryBlocks";
import memoGameLogic from "helpers/memoGameLogic";

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
  const [selectedBlock, setSelectedBlock] = useState<MemoBlock | null>(null);
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
    memoGameLogic({
      memoBlock,
      shuffledMemoBlocks,
      selectedBlock,
      setSelectedBlock,
      setShuffledMemoBlocks,
      setAnimating,
    });
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
