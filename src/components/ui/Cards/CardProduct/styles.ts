import styled, { css } from "styled-components";
import { Flex } from "@styles/layout";

type ContainerCardProductProps = {
  isSoldOut?: boolean;
};

export const ContainerCardProduct = styled(Flex)<ContainerCardProductProps>`
  padding: 1.6rem;
  border-radius: 1.2rem;
  box-shadow: var(--shadow-bottom-1);
  width: 100%;
  background-color: var(--white);
  position: relative;

  cursor: pointer;

  .button-card {
    position: absolute;
    right: 1.6rem;
    bottom: 1.6rem;
    z-index: 100;
  }

  ${({ isSoldOut }) =>
    !isSoldOut &&
    css`
      &:hover {
        box-shadow: var(--shadow-bottom-3);
        outline: 1.5px solid var(--gray-100);
      }
    `}

  ${({ isSoldOut }) =>
    isSoldOut &&
    css`
      .card-product-text {
        opacity: 0.5;
        user-select: none;
      }
      cursor: not-allowed;
      pointer-events: none;
    `}
`;
