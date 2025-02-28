import styled from "styled-components";

type ContainerChipsProps = {
  isActive: boolean;
};

export const ContainerChips = styled.div<ContainerChipsProps>`
  display: inline-block;
  background-color: ${({ isActive }) =>
    isActive ? "var(--brand-900)" : "var(--white)"};
  color: ${({ isActive }) => (isActive ? "var(--white)" : "var(--gray-600)")};
  height: 3.4rem;
  padding: 0 1rem;
  border: 1px solid
    ${({ isActive }) => (isActive ? "var(--brand-900)" : "var(--gray-100)")};
  border-radius: 15rem;

  user-select: none;

  .chips-label {
    font-size: 1.4rem;
    font-weight: 800;
  }
`;
