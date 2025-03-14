import { Flex } from "@radix-ui/themes";
import styled, { css } from "styled-components";

type ContentProps = {
  sidebarCollapsed: boolean;
  isSidebar: boolean;
};

export const Content = styled(Flex)<ContentProps>`
  transition: width 0.3s;
  min-height: calc(100vh - 5.6rem);
  height: 100%;
  ${({ isSidebar, sidebarCollapsed }) =>
    isSidebar
      ? css`
          width: ${sidebarCollapsed
            ? "calc(100% - 72px)"
            : "calc(100% - 240px)"};
          margin-left: ${sidebarCollapsed ? "72px" : "240px"};
        `
      : css`
          width: 100%;
          align-items: center;
        `}
  margin-top: 5.6rem;
`;
