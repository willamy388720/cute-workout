import { Flex } from "@radix-ui/themes";
import styled from "styled-components";

export const ContainerSignIn = styled(Flex)`
  min-height: 100vh;
  width: 100vw;
  padding: 0 2.4rem;
`;

export const CardSignIn = styled(Flex)`
  padding: var(--space-6);
  max-width: 45rem;
  width: 100%;
  border: 1px solid var(--gray-a6);
  background-color: var(--white);
  border-radius: var(--radius-3);
`;
