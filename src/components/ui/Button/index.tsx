import { ButtonContainer } from "./styles";
import { ButtonProps } from "src/@types/button";
import { useRef } from "react";

export function Button({
  children,
  size = "1",
  variant = "primary",
  disabled = false,
  loading = false,
  ...rest
}: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  return (
    <ButtonContainer
      {...rest}
      ref={buttonRef}
      size={size}
      variant={variant}
      disabled={disabled}
      role="button"
    >
      {!loading && children}
    </ButtonContainer>
  );
}
