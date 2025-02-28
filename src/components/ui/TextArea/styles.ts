import styled, { css } from "styled-components";
import { Flex } from "@styles/layout";

type ContainerTextFieldProps = {
  isFocused: boolean;
  error: boolean;
  disabled: boolean;
};

export const ContainerTextField = styled(Flex)<ContainerTextFieldProps>`
  position: relative;
  height: 9.4rem;
  border: 1px solid var(--gray-200);
  border-radius: 1.2rem;
  background-color: var(--white);
  transition: all 160ms ease-in;
  padding: 1.6rem 1.2rem;
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

export const TextInput = styled.textarea`
  /* all: unset; */
  font-size: 1.4rem;
  height: 100%;
  width: 100%;
  color: var(--gray-900);
  z-index: 10;
  overflow: hidden;
  outline: none;
  border: none;
  font-family: "Onest", sans-serif;
  resize: none;

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
