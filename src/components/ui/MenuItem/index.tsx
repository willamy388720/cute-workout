import { Flex } from "@styles/layout";
import { ContainerMenuItem } from "./styles";
import { Label, Text } from "@styles/typography";
import { RadioButton } from "../RadioButton";
import { Checkbox } from "../Checkbox";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { Badge } from "../Badge";
import { formatPrice } from "@utils/pages/formatPrice";

type MenuItemProps = {
  title: string;
  value: string;
  variant: "radio" | "checkbox" | "count";
  lowestPrice?: number;
  isMissing?: boolean;
  count?: number;
  details?: string;
  price?: number;
  onSaveValue?: (value: string) => void;
  onSaveCount?: (value: number) => void;
};

export function MenuItem({
  title,
  price,
  value,
  count = 0,
  lowestPrice = 0,
  variant,
  isMissing,
  details,
  onSaveValue = () => {},
  onSaveCount = () => {},
}: MenuItemProps) {
  const selected = value === title;

  return (
    <ContainerMenuItem
      direction="row"
      justify="space-between"
      align="center"
      disabled={isMissing}
      onClick={() => {
        if (variant !== "count" && !isMissing) {
          value === "" ? onSaveValue(title) : onSaveValue("");
        }
      }}
      selected={selected}
    >
      <Flex className="container-menu-item-texts" style={{ gap: 1 }}>
        <Text size="2" weight="regular" color="var(--gray-800)">
          {title}
        </Text>

        {details && (
          <Label weight="regular" color="var(--gray-500)">
            {details}
          </Label>
        )}

        {price && formatPrice(price) !== formatPrice(lowestPrice) && (
          <Text size="1" weight="bold" color="var(--gray-800)">
            + R$ {formatPrice(price - lowestPrice)}
          </Text>
        )}
      </Flex>

      {!isMissing && (
        <Flex gap={3} direction="row">
          {variant === "radio" && (
            <RadioButton name={title} value={value} isSelected={selected} />
          )}

          {variant === "checkbox" && (
            <Checkbox name={title} value={value} checked={selected} />
          )}

          {variant === "count" && (
            <Flex direction="row" align="center" gap={3}>
              {count > 0 && (
                <IconMinus
                  size={20}
                  color="var(--gray-700)"
                  onClick={() => {
                    if (count === 1) {
                      onSaveValue("");
                    }
                    onSaveCount(count - 1);
                  }}
                />
              )}

              {count > 0 && (
                <Text
                  size="2"
                  style={{ width: 32, userSelect: "none" }}
                  align="center"
                  color="var(--gray-900)"
                >
                  {count}
                </Text>
              )}

              <IconPlus
                size={20}
                color="var(--gray-700)"
                onClick={() => {
                  onSaveValue(title);
                  onSaveCount(count + 1);
                }}
              />
            </Flex>
          )}
        </Flex>
      )}

      {isMissing && <Badge label="Em falta" color="warning" />}
    </ContainerMenuItem>
  );
}
