import styled, { css } from "styled-components";

type ContainerTagProps = {
  isActive: boolean;
};

export const ContainerTag = styled.div<ContainerTagProps>`
  user-select: none;
  border: 1px solid var(--gray-200);
  border-radius: 1.6rem;
  padding: 0.8rem 1.2rem;

  cursor: pointer;
  color: var(--gray-700) !important;
  transition: all 0.2s ease;

  ${({ isActive }) =>
    !isActive &&
    css`
      &:hover {
        color: var(--gray-800) !important;
        border-color: var(--gray-800);
      }
    `}

  ${({ isActive }) =>
    isActive &&
    css`
      border-color: var(--brand-900);
      background-color: var(--brand-900);
      color: var(--white) !important;
      font-weight: 800 !important;
    `}
`;
