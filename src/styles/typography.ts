import styled, { css } from "styled-components";

import {
  getLineHeight,
  getSizeDisplay,
  getSizeHeading,
  getSizeText,
  getWeight,
} from "@utils/typography";

export type SizeDisplayType = "1";
export type DisplayProps = {
  size?: SizeDisplayType;
  align?: "left" | "center" | "right";
  color?: string;
};

export const Display = styled.span.attrs({
  className: "display-text",
})<DisplayProps>`
  font-weight: 700;
  color: ${({ color }) => color ?? "var(--color-text-primary)"};
  font-size: ${({ size }) => getSizeDisplay(size)};
  text-align: ${({ align }) => align ?? "left"};
  font-family: "Onest", sans-serif;
  line-height: ${({ size }) => `calc(${getSizeDisplay(size)} * 1.2)`};
`;

export type SizeHeadingType = "1" | "2" | "3";
export type HeadingProps = {
  size?: SizeHeadingType;
  align?: "left" | "center" | "right";
  color?: string;
};

export const Heading = styled.span.attrs({
  className: "display-text",
})<HeadingProps>`
  font-weight: 700;
  color: ${({ color }) => color ?? "var(--color-text-primary)"};
  font-size: ${({ size }) => getSizeHeading(size)};
  text-align: ${({ align }) => align ?? "left"};
  line-height: ${({ size }) => `calc(${getSizeHeading(size)} * 1.2)`};

  font-family: "Onest", sans-serif;
`;

export type SizeTextType = "1" | "2" | "3";
export type SizeWeightType = "regular" | "bold";
export type TextProps = {
  size?: SizeTextType;
  align?: "left" | "center" | "right";
  weight?: SizeWeightType;
  color?: string;
  underline?: "auto" | "hover" | "always";
};

export const Text = styled.span.attrs({
  className: "running-text",
})<TextProps>`
  font-weight: ${({ weight }) => getWeight(weight)};
  color: ${({ color }) => color ?? "var(--gray-900)"};
  font-size: ${({ size }) => getSizeText(size)};
  text-align: ${({ align }) => align ?? "left"};
  line-height: ${({ size, weight }) => getLineHeight(size, weight)};

  font-family: "Onest", sans-serif;

  ${({ underline }) =>
    underline === "always" &&
    css`
      text-decoration: underline;
      text-decoration-thickness: 0.1rem;
      text-underline-position: under;
    `}
`;

export type LabelProps = {
  align?: "left" | "center" | "right";
  weight?: SizeWeightType;
  color?: string;
  underline?: "auto" | "hover" | "always";
};

export const Label = styled.span.attrs({
  className: "running-text",
})<LabelProps>`
  font-weight: ${({ weight }) => getWeight(weight)};
  color: ${({ color }) => color ?? "var(--color-running-text-primary)"};
  font-size: 1.2rem;
  text-align: ${({ align }) => align ?? "left"};
  line-height: 1.92rem;

  font-family: "Onest", sans-serif;

  ${({ underline }) =>
    underline === "always" &&
    css`
      text-decoration: underline;
      text-decoration-thickness: 0.1rem;
      text-underline-position: under;
    `}
`;

export type LinkProps = {
  size?: SizeTextType;
  align?: "left" | "center" | "right";
  weight?: SizeWeightType;
  color?: string;
  underline?: "auto" | "hover" | "always";
  disabled?: boolean;
};

export const Link = styled.a.attrs({ className: "link-text" })<LinkProps>`
  font-weight: 800;
  color: ${({ color }) => color ?? "var(--gray-700)"};
  font-size: ${({ size }) => getSizeText(size)};
  text-align: ${({ align }) => align ?? "left"};
  line-height: ${({ size }) => getLineHeight(size, "bold")};
  text-decoration: none;
  font-family: "Onest", sans-serif;
  flex-shrink: 0;
  display: inline-flex;
  gap: 0.6rem;
  align-items: center;
  justify-content: center;

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.5;
      cursor: not-allowed !important;
      user-select: none;
    `}

  ${({ disabled }) =>
    !disabled &&
    css`
      &:hover {
        cursor: pointer;
      }
    `}
  

  &:focus {
    outline: 2px solid var(--brand-300);
  }

  ${({ underline, disabled }) =>
    underline === "always"
      ? css`
          text-decoration: underline;
          text-decoration-thickness: 0.1rem;
          text-underline-position: above;
        `
      : !disabled &&
        css`
          &:hover {
            text-decoration: underline;
            text-decoration-thickness: 0.1rem;
            text-underline-position: above;
          }
        `}
`;

type JanayStyleProps = {
  weight?: SizeWeightType;
  color?: string;
  bgColor?: string;
  decoration?: "underline" | "line-through" | "overline";
  fontStyle?: "normal" | "italic" | "oblique";
};

export const JanayStyle = styled.span<JanayStyleProps>`
  ${({ weight }) =>
    weight &&
    css`
      font-weight: ${getWeight(weight)};
    `};

  ${({ color }) =>
    color &&
    css`
      color: ${color} !important;
    `};

  ${({ bgColor }) =>
    bgColor &&
    css`
      background-color: ${bgColor};
      padding: 2px;
    `};

  ${({ decoration }) =>
    decoration &&
    css`
      text-decoration: ${decoration};
      text-decoration-thickness: 0.1rem;
      text-underline-position: under;
    `};

  ${({ fontStyle }) =>
    fontStyle &&
    css`
      font-style: ${fontStyle};
    `};
`;
