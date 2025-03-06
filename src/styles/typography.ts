import { Text, TextProps } from "@radix-ui/themes";
import styled from "styled-components";

const TextCustom: any = Text;

export const TextComponent = styled(TextCustom)<TextProps>``;

type LabelProps = {
  error?: boolean;
};

export const Label = styled(TextComponent).attrs({
  weight: "medium",
})<LabelProps>`
  color: ${({ error }) => (error ? "var(--red-11)" : "var(--gray-12)")};
`;

export const Optional = styled(TextComponent).attrs({ weight: "medium" })`
  color: var(--gray-a9);
`;

export const TableText = styled(TextComponent).attrs({
  size: "2",
  weight: "regular",
})`
  max-width: 18rem;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
