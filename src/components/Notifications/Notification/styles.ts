import { Flex } from "@radix-ui/themes";
import { breakpoints } from "@styles/breakpoint";
import styled from "styled-components";

export const ContainerNotification = styled(Flex)`
  padding: var(--space-3);
  border-radius: var(--radius-3);
  border: 1px solid var(--gray-a5);
  background-color: var(--white);
  justify-content: space-between;

  @media ${breakpoints.md} {
    flex-direction: column;
    gap: var(--space-3);
  }
`;
