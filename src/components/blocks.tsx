import { PropsBlocks } from "./memoBlock/types";
import { Image } from "./interfaces";
import styled from "styled-components";

const ImgBlock = styled.div<{ isSelected: boolean }>`
  display: ${({ isSelected }) => (isSelected ? "block" : "none")};
`;
function Blocks(props: PropsBlocks) {
  return (
    <>
      {props.images.map((image: Image) => (
        <ImgBlock
          className={`img-block`}
          key={`${image.id}-${props.category}`}
          onClick={() => props.handleClick(image.id, props.category)}
          isSelected={
            props.idImageSelected === image.id &&
            props.category === props.categorySelected
          }
        >
          <div className="image-overlay" />
          <img
            className={`img-block hide `}
            src={image.featured_gif.images.fixed_height_small.url}
            alt={image.display_name}
            style={{
              display:
                props.idImageSelected === image.id &&
                props.category === props.categorySelected
                  ? "block"
                  : "none",
            }}
          />
        </ImgBlock>
      ))}
    </>
  );
}

export default Blocks;
