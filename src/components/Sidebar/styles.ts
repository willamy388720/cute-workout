import { Flex } from "@styles/layout";
import { Link, Text } from "@styles/typography";
import styled, { css } from "styled-components";

export const ContainerSidebar = styled(Flex)`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;

  @media (max-width: 1366px) and (max-height: 768px) {
    border-right: 1px solid var(--gray-100);
  }
`;

type BarProps = {
  collapsed: boolean;
};

export const Bar = styled(Flex)<BarProps>`
  background: var(--white);
  color: var(--gray-900);
  height: 100vh;
  width: ${({ collapsed }) => (collapsed ? "7.2" : "24")}rem;
  transition: all 0.3s ease-out;
  border-right: 1px solid var(--gray-100);
  flex-direction: column;
  overflow: hidden;

  padding: 2.4rem 1.2rem;

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari e Opera */
  }

  @media (max-width: 1366px) and (max-height: 768px) {
    overflow-y: scroll;
    padding-bottom: 120px;
  }
`;

type MenuItemProps = {
  disabled?: boolean;
  active?: boolean;
  collapsed?: boolean;
};

export const MenuItem = styled(Link)<MenuItemProps>`
  color: var(--gray-900);
  text-decoration: none;
  user-select: none;
  transition: all 0.3s ease;
  display: flex;
  height: 4rem;

  padding-left: ${({ collapsed }) =>
    collapsed ? "calc(1.2rem + 2px)" : "1.2rem"};
  padding-right: 1.2rem;
  border-radius: 1.2rem;
  align-items: center;

  ${({ disabled }) =>
    disabled &&
    css`
      color: var(--gray-900);
      cursor: not-allowed;
      pointer-events: none;
    `}

  ${({ active }) =>
    active
      ? css`
          background-color: var(--success-500);
          color: var(--white) !important;
          font-weight: 700;
        `
      : css`
          &:hover {
            background-color: var(--gray-100);
          }
        `}
`;

export const ItemText = styled(Text)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const CollapsedSidebar = styled.button`
  all: unset;
  display: flex;
  gap: 0.8rem;
  color: var(--gray-900);
  transition: all 0.3s;
  user-select: none;
  display: flex;
  padding: 0 1.2rem;
  border-radius: 1.2rem;
  height: 4rem;

  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: var(--gray-100);
  }

  &:active {
    background-color: var(--success-500);
    color: var(--white);
  }
`;
