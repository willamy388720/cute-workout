import styled, { css } from "styled-components";
import { Flex } from "@styles/layout";

export type SizesInput = "1" | "2" | "3";

type ContainerTextFieldProps = {
  isFocused: boolean;
  error: boolean;
  disabled: boolean;
  sizeInput: SizesInput;
};

export const ContainerTextField = styled(Flex)<ContainerTextFieldProps>`
  position: relative;
  height: ${({ sizeInput }) =>
    sizeInput === "1" ? "3.6" : sizeInput === "2" ? "4.4" : "5.2"}rem;
  border: 1px solid var(--gray-200);
  border-radius: ${({ sizeInput }) =>
    sizeInput === "1" ? "0.8" : sizeInput === "2" ? "1" : "1.2"}rem;
  background-color: var(--white);
  transition: all 160ms ease-in;
  padding: 0 1.2rem;
  flex-direction: row;
  align-items: center;
  gap: 6px;

  ${({ disabled }) =>
    !disabled &&
    css`
      &:hover {
        border-color: var(--border-color);
      }
    `}

  ${({ isFocused }) =>
    isFocused &&
    css`
      border-color: var(--border-color);
    `}

  ${({ error }) =>
    error &&
    css`
      border-color: var(--danger-500);
    `}

  ${({ disabled }) =>
    disabled &&
    css`
      border-color: var(--gray-100);
      cursor: not-allowed;
    `}
`;

type TextInputProps = {
  sizeInput: SizesInput;
};

export const TextInput = styled.input<TextInputProps>`
  all: unset;
  font-size: ${({ sizeInput }) => (sizeInput === "1" ? "1.4" : "1.6")}rem;
  height: 100%;
  width: 100%;
  color: var(--gray-900);
  z-index: 10;
  overflow: hidden;
  line-height: ${({ sizeInput }) => (sizeInput === "1" ? "1.4" : "1.6")}rem;

  &::placeholder {
    width: 0;
  }

  &:focus {
    &::placeholder {
      width: 100%;
      color: var(--gray-500);
    }
  }

  ${({ disabled }) =>
    disabled &&
    css`
      pointer-events: none;
      color: var(--gray-500);
    `}
`;

type InputLabelProps = {
  isFocused: boolean;
  error: boolean;
  disabled: boolean;
  sizeInput: SizesInput;
  hasText: boolean;
};

export const InputLabel = styled.label<InputLabelProps>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: var(--gray-600);
  cursor: text;
  transition: all 200ms ease-in;
  background-color: var(--white);
  font-size: ${({ sizeInput }) => (sizeInput === "1" ? "1.4" : "1.6")}rem;
  line-height: 2.56rem;

  ${({ isFocused, hasText }) =>
    (isFocused || hasText) &&
    css`
      top: 0px;
      left: 1.2rem;
      font-size: 1.2rem;
      color: ${isFocused ? "var(--brand-900)" : "var(--gray-600)"};
      line-height: 0rem;
      padding: 1px 4px;
      background-color: var(--white);
    `}

  ${({ error }) =>
    error &&
    css`
      color: var(--danger-500);
    `}

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
      user-select: none;
      color: var(--gray-500);
    `}
`;

type HelperTextProps = {
  error: boolean;
  disabled: boolean;
};

export const HelperText = styled.span<HelperTextProps>`
  margin-left: 1.6rem;
  color: ${({ error }) => (error ? "var(--danger-500)" : "var(--gray-600)")};
  font-size: 1.2rem;
  line-height: 1.92rem;
  font-weight: 500;

  ${({ disabled }) =>
    disabled &&
    css`
      color: var(--gray-300);
    `}
`;
