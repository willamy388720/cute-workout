import { Flex } from "@radix-ui/themes";
import { TextComponent } from "@styles/typography";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

export const ContainerSidebar = styled(Flex)`
  position: fixed;
  left: 0;
  bottom: 0;
  top: 5.6rem;

  @media (max-width: 1366px) and (max-height: 768px) {
    border-right: 1px solid var(--gray-a6);
  }
`;

type BarProps = {
  collapsed: boolean;
};

export const Bar = styled(Flex)<BarProps>`
  background: var(--color-background);
  color: var(--gray-12);
  height: calc(100vh - 5.6rem);
  width: ${({ collapsed }) => (collapsed ? "7.2" : "24")}rem;
  transition: all 0.3s ease-out;
  border-right: 1px solid var(--gray-a6);
  flex-direction: column;
  overflow: hidden;

  padding: 0 var(--space-3);

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
  color: var(--gray-12);
  text-decoration: none;
  user-select: none;
  transition: all 0.3s ease;
  display: flex;
  height: 4rem;

  padding-left: ${({ collapsed }) =>
    collapsed ? "calc(var(--space-3) + 2px)" : "var(--space-3)"};
  padding-right: var(--space-3);
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

export const ItemText = styled(TextComponent)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const CollapsedSidebar = styled.button`
  all: unset;
  display: flex;
  gap: var(--space-2);
  color: var(--gray-12);
  transition: all 0.3s;
  user-select: none;
  display: flex;
  padding: 0 var(--space-3);
  border-radius: var(--radius-3);
  height: 4rem;

  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: var(--accent-a3);
  }

  &:active {
    background-color: var(--accent-10);
    color: var(--gray-1);
  }
`;
