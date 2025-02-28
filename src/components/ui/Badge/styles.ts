import styled from "styled-components";

type ContainerBadgeProps = {
  color: string;
};

export const ContainerBadge = styled.div<ContainerBadgeProps>`
  display: inline-flex;
  height: 1.8rem;
  background-color: ${({ color }) => color};
  color: ${({ color }) =>
    color === "var(--warning-500)"
      ? "var(--gray-900)"
      : color === "var(--brand-900)"
      ? "var(--button-text-color)"
      : "var(--white)"};

  padding: 0 8px;
  border-radius: 4px;
  align-items: center;
  user-select: none;

  span {
    font-weight: 800;
    font-size: 1.2rem;
    line-height: 1.2rem;
    text-transform: uppercase;
  }
`;
