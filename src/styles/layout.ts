import { SPACING } from "@themes/default";
import styled, { css } from "styled-components";

type FlexProps = {
  display?: "none" | "inline-flex" | "flex";
  direction?: "row" | "column" | "row-reverse" | "column-reverse";
  align?: "start" | "center" | "end" | "baseline" | "stretch";
  justify?: "start" | "center" | "end" | "space-between";
  wrap?: "nowrap" | "wrap" | "wrap-reverse";
  gap?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
};

export const Flex = styled.div<FlexProps>`
  display: ${({ display }) => display ?? "flex"};
  flex-direction: ${({ direction }) => direction ?? "column"};

  ${({ gap }) =>
    gap &&
    css`
      gap: ${SPACING[gap]};
    `}

  ${({ align }) =>
    align &&
    css`
      align-items: ${align};
    `}

  justify-content: ${({ justify }) => justify ?? "start"};

  ${({ wrap }) =>
    wrap &&
    css`
      flex-wrap: ${wrap};
    `}
`;
