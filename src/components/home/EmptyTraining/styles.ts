import { Flex } from "@radix-ui/themes";
import styled from "styled-components";

type CardtTypeOfCreationProps = {
  selected: boolean;
};

export const CardtTypeOfCreation = styled(Flex)<CardtTypeOfCreationProps>`
  user-select: none;
  cursor: pointer;
  border: 1px solid
    ${({ selected }) => (selected ? "var(--accent-9)" : "var(--gray-a6)")};
  border-radius: var(--radius-3);
  max-width: 24rem;
  width: 100%;
  padding: 2rem;
`;
