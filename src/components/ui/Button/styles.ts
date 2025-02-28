import styled, { css } from "styled-components";
import {
  getBackgroundColorButton,
  getHoverBackgroundColorButton,
} from "@utils/button";
import { VariantType } from "src/@types/button";

type ButtonContainerProps = {
  size: "1" | "2" | "3";
  variant: VariantType;
  disabled?: boolean;
};

export const ButtonContainer = styled.button<ButtonContainerProps>`
  all: unset;
  padding: 0
    ${({ size }) => (size === "3" ? "1.8" : size === "2" ? "1.6" : "1.2")}rem;
  font-size: ${({ size }) => (size === "3" ? "1.6" : "1.4")}rem;
  gap: ${({ size }) => (size === "3" ? "8" : "6")}px;
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

  ${({ variant, disabled }) =>
    (variant === "secondary" || variant === "link") &&
    !disabled &&
    css`
      &:hover {
        color: var(--gray-900) !important;
      }
    `}

  ${({ variant, disabled }) =>
    variant === "link" &&
    !disabled &&
    css`
      &:hover {
        text-decoration: underline;
        text-decoration-thickness: 0.1rem;
        text-underline-position: above;
      }
    `}

  display: inline-flex;
  justify-content: center;
  align-items: center;
  user-select: none;

  cursor: pointer;
  flex-shrink: 0;

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
