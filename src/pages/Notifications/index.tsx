import { EmptyNotifications } from "@components/Notifications/EmptyNotifications";
import { ContainerNotifications } from "./styles";
import { useNotifications } from "@hooks/useNofitications";
import { Flex, Spinner } from "@radix-ui/themes";
import { Notification } from "@components/Notifications/Notification";

export function Notifications() {
  const { notifications, isLoading } = useNotifications();

  if (isLoading) {
    return (
      <ContainerNotifications
        width={"100%"}
        justify={"center"}
        align={"center"}
      >
        <Spinner size={"3"} />
      </ContainerNotifications>
    );
  }

  return (
    <ContainerNotifications direction={"column"}>
      {notifications.length === 0 && <EmptyNotifications />}

      <Flex direction={"column"} gap={"3"}>
        {notifications.map((notification) => (
          <Notification key={notification.id} notification={notification} />
        ))}
      </Flex>
    </ContainerNotifications>
  );
}
