import {
  ElementType,
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ContainerTextField,
  HelperText,
  InputLabel,
  SizesInput,
  TextInput,
} from "./styles";
import { Flex } from "@styles/layout";

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  sizeInput: SizesInput;
  label?: string;
  iconLeft?: ElementType;
  iconRight?: ElementType;
  error?: boolean;
  helperMessage?: string;
  disabled?: boolean;
};
export function TextField({
  sizeInput = "1",
  label,
  iconLeft: IconLeft,
  iconRight: IconRight,
  error = false,
  helperMessage = "",
  disabled = false,
  ...rest
}: TextFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasText, setHasText] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      setHasText(inputRef.current.value.trim() !== "");
    }
  }, [rest.value]);

  return (
    <Flex gap={1}>
      <ContainerTextField
        isFocused={isFocused}
        error={error}
        disabled={disabled}
        sizeInput={sizeInput}
      >
        {IconLeft && <IconLeft size={24} color="var(--gray-500)" />}

        <TextInput
          {...rest}
          ref={inputRef}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          sizeInput={sizeInput}
        />

        {label && (
          <InputLabel
            isFocused={isFocused}
            style={IconLeft && !isFocused ? { left: 36 } : {}}
            error={error}
            disabled={disabled}
            sizeInput={sizeInput}
            hasText={hasText}
          >
            {label}
          </InputLabel>
        )}

        {IconRight && <IconRight size={24} color="var(--gray-500)" />}
      </ContainerTextField>

      {helperMessage.trim() !== "" && (
        <HelperText error={error} disabled={disabled}>
          {helperMessage}
        </HelperText>
      )}
    </Flex>
  );
}
