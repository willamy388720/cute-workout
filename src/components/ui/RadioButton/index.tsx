import { InputHTMLAttributes } from "react";
import { Wrapper } from "./styles";
import { Text } from "@styles/typography";
import { Flex } from "@styles/layout";

type RadioButtonProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  isSelected: boolean;
  label?: string;
  onChangeValue?: () => void;
};

export function RadioButton({
  name,
  label,
  isSelected,
  onChangeValue,
  ...rest
}: RadioButtonProps) {
  return (
    <Flex direction="row" align="center" gap={2}>
      <Wrapper>
        <input
          {...rest}
          id={name}
          type="radio"
          name={name}
          checked={isSelected}
          onChange={onChangeValue}
        />

        <span className="circle"></span>
        <span></span>
      </Wrapper>

      {label && (
        <label htmlFor={name}>
          <Text size="2" weight={isSelected ? "bold" : "regular"}>
            {label}
          </Text>
        </label>
      )}
    </Flex>
  );
}
