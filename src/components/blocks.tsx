import { Image } from "components/interfaces";
interface BlocksProps {
  memoBlocks: {
    index: number;
    image: Image;
    flipped: boolean;
  }[];
  animating: boolean;
  handleClick: (memoBlock: {
    index: number;
    image: Image;
    flipped: boolean;
  }) => void;
}

function Blocks(props: any) {
  console.log(props, "luz props the blocks");

  if (!props.memoBlocks) {
    return <p>please wait luz</p>;
  }
  return (
    <>
      {props.memoBlocks.map(
        (
          memoBlock: {
            index: number;
            image: Image;
            flipped: boolean;
          },
          i: number
        ) => (
          <div
            key={i}
            className="img-block"
            onClick={() =>
              !memoBlock.flipped &&
              !props.animating &&
              props.handleClick(memoBlock)
            }
          >
            <div
              className={`img-block-inner ${
                memoBlock.flipped && "img-block-flipped"
              }`}
            >
              <div className="img-block-front"></div>
              <img
                className="img-block-back"
                src={memoBlock.image.featured_gif.images.fixed_height_small.url}
                alt={memoBlock.image.display_name}
              ></img>
            </div>
          </div>
        )
      )}
    </>
  );
}

export default Blocks;
