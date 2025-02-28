import { Flex } from "@styles/layout";
import { ContainerHead } from "./styles";
import { Text } from "@styles/typography";
import { IconCircleCheckFilled } from "@tabler/icons-react";
import { Badge } from "../Badge";

type HeadProps = {
  title: string;
  details: string;
  totalItems: number;
  quantityOfItemsSelected: number;
  required?: boolean;
};

export function Head({
  title,
  details,
  totalItems,
  quantityOfItemsSelected,
  required,
}: HeadProps) {
  const isComplete = totalItems === quantityOfItemsSelected;
  const colorBadge = isComplete ? "success" : "gray";

  return (
    <ContainerHead direction="row" justify="space-between" align="center">
      <Flex gap={1}>
        <Text size="2" weight="bold" color="var(--gray-800)">
          {title}
        </Text>
        <Text size="1" weight="regular" color="var(--gray-600)">
          {details}
        </Text>
      </Flex>

      <Flex direction="row" gap={1} align="center">
        {totalItems && totalItems > 1 && (
          <Badge
            color={colorBadge}
            label={`${quantityOfItemsSelected}/${totalItems}`}
          />
        )}

        {required && !isComplete && (
          <Badge color={colorBadge} label="obrigatório" />
        )}

        {isComplete && (
          <IconCircleCheckFilled size={20} color="var(--success-500)" />
        )}
      </Flex>
    </ContainerHead>
  );
}
