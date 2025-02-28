// CheckboxWrapper.tsx
import styled, { keyframes } from "styled-components";

const waveAnimation = keyframes`
  50% {
    transform: scale(0.9);
  }
`;

export const CheckboxWrapper = styled.div`
  position: relative;
  * {
    box-sizing: border-box;
  }
`;

export const CheckboxInput = styled.input`
  position: absolute;
  visibility: hidden;

  &:checked + label span:first-child {
    background: var(--brand-900);
    border-color: var(--brand-900);
    animation: ${waveAnimation} 0.4s ease;
  }

  &:checked + label span:first-child svg {
    stroke-dashoffset: 0;
  }
`;

export const CheckboxLabel = styled.label`
  -webkit-user-select: none;
  user-select: none;
  cursor: pointer;
  border-radius: 4px;
  overflow: hidden;
  transition: all 0.2s ease;
  display: inline-block;

  &:not(:last-child) {
    margin-right: 6px;
  }

  span {
    float: left;
    vertical-align: middle;
    transform: translate3d(0, 0, 0);

    &:first-child {
      position: relative;
      width: 2rem;
      height: 2rem;
      border-radius: 4px;
      transform: scale(1);
      border: 1.5px solid var(--gray-400);
      transition: all 0.2s ease;

      svg {
        position: absolute;
        top: 4px;
        left: 3px;
        fill: none;
        stroke: var(--button-text-color);
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-dasharray: 16px;
        stroke-dashoffset: 16px;
        transition: all 0.3s ease;
        transition-delay: 0.1s;
        transform: translate3d(0, 0, 0);
      }
    }

    &:last-child {
      padding-left: 8px;
      line-height: 18px;
    }
  }

  &:hover span:first-child {
    border-color: var(--brand-900);
  }
`;

export const InlineSvg = styled.svg`
  position: absolute;
  width: 0;
  height: 0;
  pointer-events: none;
  user-select: none;
`;
