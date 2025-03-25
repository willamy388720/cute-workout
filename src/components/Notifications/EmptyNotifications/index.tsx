import { Flex, Heading } from "@radix-ui/themes";
import { Bell } from "lucide-react";

export function EmptyNotifications() {
  return (
    <Flex
      direction={"column"}
      width={"100%"}
      align={"center"}
      justify={"center"}
      gap={"3"}
      style={{ flex: 1 }}
    >
      <Bell size={100} color="var(--gray-9)" />

      <Flex direction={"column"} align={"center"}>
        <Heading>Nenhuma notificação</Heading>
      </Flex>
    </Flex>
  );
}
