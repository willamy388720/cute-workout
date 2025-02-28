import { TextareaHTMLAttributes, useState } from "react";
import { ContainerTextField, HelperText, TextInput } from "./styles";
import { Flex } from "@styles/layout";

type InputFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: boolean;
  helperMessage?: string;
  disabled?: boolean;
};
export function TextArea({
  error = false,
  helperMessage = "",
  disabled = false,
  ...rest
}: InputFieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Flex gap={1}>
      <ContainerTextField
        isFocused={isFocused}
        error={error}
        disabled={disabled}
      >
        <TextInput
          {...rest}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          rows={4}
          cols={50}
        />
      </ContainerTextField>

      {helperMessage.trim() !== "" && (
        <HelperText error={error} disabled={disabled}>
          {helperMessage}
        </HelperText>
      )}
    </Flex>
  );
}
