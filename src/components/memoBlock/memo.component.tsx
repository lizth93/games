import { useState, useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "store";
import { getImages } from "store/getImages";
import { Props, Image } from "components/interfaces";
import { RootState } from "store/imagesSlice";
import Blocks from "components/blocks";

function MemoBlock(props: Props): JSX.Element {
  const dispatch: AppDispatch = useDispatch<AppDispatch>();
  const [shuffledMemoBlocks, setShuffledMemoBlocks] = useState<
    { index: number; image: Image; flipped: boolean }[]
  >([]);
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
      const shuffledImages = sortImages([...images, ...images]);
      setShuffledMemoBlocks(
        shuffledImages.map((image, i) => ({ index: i, image, flipped: false }))
      );
    }
  }, [images]);

  if (isLoadingImages) {
    return <p>Please Wait</p>;
  }

  function sortImages(images: Image[]) {
    return images.slice().sort(() => 0.5 - Math.random());
  }

  function handleClick(memoBlock: {
    index: number;
    image: Image;
    flipped: boolean;
  }) {
    console.log(memoBlock, "what memoblock have");
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
  return (
    <div className={`${props.className} content`}>
      <Blocks
        memoBlocks={shuffledMemoBlocks}
        animating={isAnimating}
        handleClick={handleClick}
      />
    </div>
  );
}
export default MemoBlock;
