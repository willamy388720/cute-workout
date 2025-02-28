import {
  getBackgroundColorButton,
  getHoverBackgroundColorButton,
} from "@utils/button";
import { VariantType } from "src/@types/button";
import styled, { css } from "styled-components";

type ButtonProps = {
  size: "1" | "2" | "3";
  variant: VariantType;
  disabled?: boolean;
};

export const ContainerButtonBetween = styled.button<ButtonProps>`
  all: unset;
  padding: 0
    ${({ size }) => (size === "3" ? "1.8" : size === "2" ? "1.6" : "1.2")}rem;
  font-size: ${({ size }) => (size === "3" ? "1.6" : "1.4")}rem;
  justify-content: space-between;
  font-weight: 700;
  height: ${({ size }) =>
    size === "1" ? "3.6" : size === "2" ? "4.4" : "5.2"}rem;
  border-radius: ${({ size }) =>
    size === "1" ? "0.8" : size === "2" ? "1" : "1.2"}rem;

  font-family: "Onest", sans-serif;
  line-height: ${({ size }) => (size === "3" ? "1.6" : "1.4")}rem;
  letter-spacing: 2%;
  text-transform: uppercase;

  background-color: ${({ variant }) => getBackgroundColorButton(variant)};
  color: ${({ variant }) =>
    variant === "primary"
      ? "var(--button-text-color)"
      : "var(--gray-800)"} !important;

  display: inline-flex;
  align-items: center;
  user-select: none;

  cursor: pointer;
  flex-shrink: 0;

  ${({ variant, disabled }) =>
    (variant === "secondary" || variant === "link") &&
    !disabled &&
    css`
      &:hover {
        color: var(--gray-900) !important;
      }
    `}

  ${({ disabled, variant }) =>
    !disabled &&
    css`
      &:hover {
        background-color: ${getHoverBackgroundColorButton(variant)};
        transition: background 0.3s;
      }
    `}

    ${({ variant }) =>
    variant === "secondary" &&
    css`
      outline: 1px solid var(--gray-200);
    `}

    ${({ disabled, variant }) =>
    disabled &&
    css`
      cursor: not-allowed;
      ${variant === "primary"
        ? css`
            color: var(--white) !important;
            background-color: var(--gray-400);
          `
        : variant === "secondary"
        ? css`
            outline: 1px solid var(--gray-100);
            color: var(--gray-400) !important;
          `
        : css`
            color: var(--gray-400) !important;
          `}
    `}
`;
