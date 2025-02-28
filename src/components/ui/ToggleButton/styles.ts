import styled, { css } from "styled-components";

type ToggleWrapperProps = {
  checked: boolean;
};

export const ToggleWrapper = styled.div<ToggleWrapperProps>`
  .switch {
    display: inline-block;
    height: 2.4rem;
    position: relative;
    width: 4.2rem;
  }

  .switch input {
    display: none;
  }

  .slider {
    background-color: var(--gray-100);
    bottom: 0;
    cursor: pointer;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    transition: 0.4s;
    border-radius: 1.2rem;
  }

  .slider:before {
    background-color: var(--button-text-color);
    top: 2px;
    left: 2px;
    content: "";
    height: 2rem;
    width: 2rem;
    position: absolute;
    transition: 0.4s;
    border-radius: 50%;
  }

  ${({ checked }) =>
    !checked &&
    css`
      .slider:before {
        background-color: var(--white);
      }
    `}

  input:checked + .slider {
    background-color: var(--brand-900);
  }

  input:checked + .slider:before {
    transform: translateX(2rem);
    left: -1px;
  }
`;
