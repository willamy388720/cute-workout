import styled from "styled-components";
import { Flex } from "@styles/layout";

export const GridContent = styled(Flex)`
  max-width: 128rem;
  width: 100%;
  align-self: center;

  @media (max-width: 1300px) {
    padding: 1.6rem;
  }
`;
