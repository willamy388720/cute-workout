// RadioButtonWrapper.tsx
import styled from "styled-components";

export const Wrapper = styled.label`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  transition: all ease 0.3s;

  .circle {
    position: relative;
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background-color: var(--white);
    transition: all 0.15s ease;
    border: 1.5px solid var(--gray-400);
  }

  .circle:after {
    content: "";
    position: absolute;
    display: block;
    top: 6px;
    left: 6px;
    bottom: 6px;
    right: 6px;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background: var(--button-text-color);
    opacity: 0;
    transform: scale(0);
  }

  input {
    position: absolute;
    opacity: 0;
    display: none;
  }

  input:checked + .circle {
    background-color: var(--brand-900);
    border: none;
  }

  input:checked + .circle:after {
    opacity: 1;
    transform: scale(1);
    transition: all 0.15s ease;
    border: none;
  }
`;
