import styled from "styled-components";

import { breakpoints } from "@styles/breakpoint";
import { Flex } from "@radix-ui/themes";

export const ContainerHeader = styled(Flex)`
  background-color: var(--color-background);
  border-bottom: 1px solid var(--gray-a6);
  padding: 0 var(--space-5);
  height: 5.6rem;
  align-items: center;
  position: fixed;
  z-index: 1000;
`;

export const ContainerLogo = styled(Flex)`
  gap: var(--space-5);

  @media ${breakpoints.sm} {
    gap: var(--space-3);
  }
`;

export const ContentHeader = styled(Flex)`
  .logo-desktop {
    display: block;
    width: 14.5rem;
    height: 3rem;
  }

  .logo-mobile {
    display: none;
    width: 2.6rem;
    height: 2.4rem;
  }

  .by-nocap {
    display: block;
  }

  .signout-desktop {
    display: inline-flex;
  }

  .signout-mobile {
    display: none;
  }

  .info-user {
    display: flex;
  }

  @media ${breakpoints.sm} {
    .logo-desktop {
      display: none;
    }

    .logo-mobile {
      display: block;
    }

    .by-nocap {
      display: none;
    }

    .signout-desktop {
      display: none;
    }

    .signout-mobile {
      display: inline-flex;
    }

    .info-user {
      display: none;
    }
  }
`;
