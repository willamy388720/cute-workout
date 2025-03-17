import { Flex } from "@radix-ui/themes";
import { breakpoints } from "@styles/breakpoint";
import styled from "styled-components";

export const ContainerProfile = styled(Flex)`
  flex: 1;

  @media ${breakpoints.xs} {
    margin: 0 var(--space-5);
  }
`;
