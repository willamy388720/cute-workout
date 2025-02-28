import { Text } from "@styles/typography";
import { ContainerTag } from "./styles";
import { useState } from "react";

type TagProps = {
  label: string;
};

export function Tag({ label }: TagProps) {
  const [isActive, setIsActive] = useState(false);
  return (
    <ContainerTag
      isActive={isActive}
      onClick={() => setIsActive((prev) => !prev)}
    >
      <Text weight="regular" size="2">
        {label}
      </Text>
    </ContainerTag>
  );
}
