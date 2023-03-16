import styled from "styled-components";
import Title from "./title";

export default styled(Title)`
  .text {
    font-size: 12rem;
    fill: none;
    stroke-width: 6;
    stroke-linejoin: round;
    stroke-dasharray: 70 330;
    stroke-dashoffset: 0;
    -webkit-animation: stroke 6s infinite linear;
    animation: stroke 6s infinite linear;

    &:nth-child(5n + 1) {
      stroke: #f2385a;
      -webkit-animation-delay: -1.2s;
      animation-delay: -2.2s;
    }
    &:nth-child(5n + 2) {
      stroke: #f5a503;
      -webkit-animation-delay: -2.4s;
      animation-delay: -4.4s;
    }
    &:nth-child(5n + 3) {
      stroke: #e9f1df;
      -webkit-animation-delay: -3.6s;
      animation-delay: -5.6s;
    }
    &:nth-child(5n + 4) {
      stroke: #56d9cd;
      -webkit-animation-delay: -4.8s;
      animation-delay: -6.8s;
    }
    &:nth-child(5n + 5) {
      stroke: #3aa1bf;
      -webkit-animation-delay: -6s;
      animation-delay: -8s;
    }
  }

  @-webkit-keyframes stroke {
    100% {
      stroke-dashoffset: -400;
    }
  }

  @keyframes stroke {
    100% {
      stroke-dashoffset: -400;
    }
  }
`;
