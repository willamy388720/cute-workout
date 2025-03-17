import { Flex, Text } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

export const ContainerMenuMobile = styled(Flex)`
  background-color: var(--gray-1);
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 5.6rem;
  gap: 0.4rem;
  padding: 2rem;
`;

type MenuItemProps = {
  disabled?: boolean;
  active?: boolean;
};

export const MenuItem = styled(Link)<MenuItemProps>`
  color: var(--gray-12);
  text-decoration: none;
  user-select: none;
  transition: all 0.3s ease;
  display: flex;
  height: 4rem;
  width: 100%;
  align-items: center;

  padding: var(--space-6);

  /* padding-left: var(--space-3); */
  /* padding-right: var(--space-3); */
  border-radius: var(--radius-3);
  align-items: center;

  ${({ disabled }) =>
    disabled &&
    css`
      color: var(--gray-9);
      cursor: not-allowed;
      pointer-events: none;
    `}

  ${({ active }) =>
    active
      ? css`
          background-color: var(--accent-10);
          color: var(--gray-1);
          font-weight: 700;
        `
      : css`
          &:hover {
            background-color: var(--accent-a3);
          }
        `}
`;

export const ItemText = styled(Text)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
