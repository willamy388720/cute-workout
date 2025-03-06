import { Flex, Text } from "@radix-ui/themes";
import {
  ToastDescription,
  ToastRoot,
  ToastTitle,
  ToastViewport,
} from "./styles";
import { Check, TriangleAlert } from "lucide-react";

type Props = {
  title: string;
  content: string;
  error: boolean;
  open: boolean;
  onClose: () => void;
};

export function Toast({ title, content, error, open, onClose }: Props) {
  return (
    <>
      <ToastRoot
        className="ToastRoot"
        open={open}
        variant={error ? "error" : "default"}
        onOpenChange={onClose}
        duration={2000}
      >
        <Flex gap={"4"}>
          {error ? (
            <TriangleAlert size={24} color={"var(--red-11)"} />
          ) : (
            <Check size={24} color={"var(--accent-9)"} />
          )}

          <Flex align={"center"} justify={"between"} width="100%" gap={"4"}>
            <Flex direction={"column"} gap={"1"}>
              <ToastTitle>
                <Text weight={"bold"} size={"3"}>
                  {title}
                </Text>
              </ToastTitle>

              <ToastDescription asChild>
                <Text size={"2"} color="gray">
                  {content}
                </Text>
              </ToastDescription>
            </Flex>
          </Flex>
        </Flex>
      </ToastRoot>
      <ToastViewport />
    </>
  );
}
