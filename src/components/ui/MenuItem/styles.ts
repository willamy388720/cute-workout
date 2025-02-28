import styled, { css } from "styled-components";
import { Flex } from "@styles/layout";

type ContainerMenuItemProps = {
  selected: boolean;
  disabled?: boolean;
};

export const ContainerMenuItem = styled(Flex)<ContainerMenuItemProps>`
  padding: 1.2rem 1.6rem;
  border-bottom: 1px solid var(--gray-100);
  background-color: ${({ selected }) =>
    selected ? "var(--brand-300)" : "var(--white)"};

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;

      .container-menu-item-texts {
        opacity: 0.5;
      }
    `}

  ${({ disabled }) =>
    !disabled &&
    css`
      cursor: pointer;

      &:hover {
        background-color: var(--gray-50);
      }
    `}
`;
