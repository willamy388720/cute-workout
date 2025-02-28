import styled, { css } from "styled-components";
import { Flex } from "@styles/layout";

type ContainerCardItemProps = {
  isSoldOut?: boolean;
};

export const ContainerCardItem = styled(Flex)<ContainerCardItemProps>`
  width: 100%;
  background-color: var(--gray-50);

  cursor: pointer;

  &:hover {
    box-shadow: var(--shadow-bottom-3);
    outline: 1.5px solid var(--gray-100);
  }

  ${({ isSoldOut }) =>
    isSoldOut
      ? css`
          border-bottom-left-radius: 1rem;
          border-bottom-right-radius: 1rem;
        `
      : css`
          border-radius: 1rem;
        `}
`;

export const ContentCardItem = styled(Flex)`
  padding: 1.2rem;
`;

export const IsSoldOut = styled(Flex)`
  background-color: var(--danger-500);
  height: 3rem;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  justify-content: center;
  align-items: center;
`;
