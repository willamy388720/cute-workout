import { Flex } from "@styles/layout";
import { ContainerChips } from "./style";
import { IconCheck } from "@tabler/icons-react";

type ChipsProps = {
  label: string;
  isActive?: boolean;
};

export function Chips({ label, isActive = false }: ChipsProps) {
  return (
    <ContainerChips isActive={isActive}>
      <Flex direction="row" style={{ gap: 6, height: "100%" }} align="center">
        {isActive && <IconCheck size={20} />}

        <span className="chips-label">{label}</span>
      </Flex>
    </ContainerChips>
  );
}
