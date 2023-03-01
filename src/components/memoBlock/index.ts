import styled from "styled-components";
import MemoBlock from "./memo.component";

export default styled(MemoBlock)`
  margin: auto;
  max-width: fit-content;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 2px;
  margin-top: 2rem;

  // 55.6em = 890px
  @media screen and (max-width: 55.6em) {
    margin-top: 1rem;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(8, 1fr);
  }

  .img-block {
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
      rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
      rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    width: 100px;
    height: 100px;
    position: relative;
    display: inline-block;
    cursor: pointer;
    aspect-ratio: 1 / 1;

    //25em = 400px
    @media screen and (max-width: 25em) {
      gap: 1px;
      width: 80px;
      height: 80px;
    }

    //20.6em = 329px
    @media screen and (max-width: 20.6em) {
      gap: 1px;
      width: 70px;
      height: 70px;
    }

    &-front,
    &-back {
      position: absolute;
      width: 100%;
      height: 100%;
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
      border-radius: 4px;
    }

    &-inner {
      position: relative;
      width: 100%;
      height: 100%;
      text-align: center;
      transition: transform 0.6s;
      transform-style: preserve-3d;
    }

    &-flipped {
      transform: rotateY(180deg);
    }

    &-back {
      background-color: #63e6be;
      transform: rotateY(180deg);
      box-shadow: 5px 5px 10px 0px rgb(0 0 0 / 50%);
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 55px;
    }

    &-front {
      background-color: #5c940d;
    }
  }
  .flipped {
    transform: rotateY(180deg);
  }
`;
