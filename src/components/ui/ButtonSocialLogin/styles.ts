import styled, { css } from "styled-components";

export type VariantsLoginSocial = "google" | "facebook" | "apple";

type ButtonProps = {
  variant: VariantsLoginSocial;
  disabled?: boolean;
  color: string;
};

export const ContainerButtonSocialLogin = styled.button<ButtonProps>`
  all: unset;
  padding: 0 1.8rem;
  font-size: 1.6rem;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  height: 5.2rem;
  border-radius: 1.2rem;

  font-family: "Onest", sans-serif;
  line-height: 1.6rem;
  letter-spacing: 2%;
  text-transform: uppercase;

  background-color: ${({ color }) => color};
  color: ${({ variant }) =>
    variant === "google" ? "var(--gray-800)" : "var(--white)"} !important;

  display: inline-flex;
  align-items: center;
  user-select: none;

  cursor: pointer;
  flex-shrink: 0;

  ${({ variant, disabled }) =>
    variant === "google" &&
    !disabled &&
    css`
      &:hover {
        color: var(--gray-900) !important;
      }
    `}

  ${({ variant }) =>
    variant === "google" &&
    css`
      outline: 1px solid #15151533;
    `}
    
  ${({ disabled, variant }) =>
    !disabled &&
    variant === "google" &&
    css`
      &:hover {
        outline: 1px solid var(--gray-900);
        transition: background 0.3s;
      }
    `}


    ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
      opacity: 0.5;
    `}
`;
