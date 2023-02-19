import styled from "styled-components";
import MemoBlock from "./memo.component";

export default styled(MemoBlock)`
  display: grid;
  grid-template-columns: repeat(4, 100px);
  grid-template-rows: repeat(4, 1fr);

  .img-block {
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
      rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
      rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  }
`;
