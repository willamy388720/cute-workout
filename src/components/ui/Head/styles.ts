import styled from "styled-components";
import { Flex } from "@styles/layout";

export const ContainerHead = styled(Flex)`
  padding: 1.2rem 1.6rem;
  background-color: var(--gray-100);
  border-top: 1px solid var(--gray-200);
  border-bottom: 1px solid var(--gray-200);
  position: sticky;
  top: 0;
`;
