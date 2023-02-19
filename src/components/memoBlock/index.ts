import styled from "styled-components";
import MemoBlock from "./memo.component";

export default styled(MemoBlock)`
  margin-top: 2rem;
  margin: auto;
  max-width: fit-content;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 2px;

  .img-block {
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
      rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
      rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;

    width: 100px;
    height: 100px;

    position: relative;
    display: inline-block;
  }
  .image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000; /* color que desees */
    opacity: 0.5; /* opacidad del color que cubre la imagen */
    transition: opacity 0.5s ease; /* transición para suavizar el cambio de opacidad */
  }
  .hide {
    display: none;
  }

  /* .selected + .image-overlay {
    display: none;
  } */
`;
