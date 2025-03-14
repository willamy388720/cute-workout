import { Flex } from "@radix-ui/themes";
import styled from "styled-components";

export const ButtonPage = styled(Flex)`
  width: 32px;
  height: 32px;
  color: var(--gray-a9);
  border-radius: var(--radius-2);
  user-select: none;

  cursor: pointer;

  &:hover {
    background-color: var(--accent-a5);
  }

  &.active {
    background-color: var(--accent-9);
    color: var(--gray-1);
  }
`;
