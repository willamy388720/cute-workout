import { Avatar, Flex, IconButton, Skeleton, Text } from "@radix-ui/themes";
import { ContainerHeader, ContainerLogo, ContentHeader } from "./styles";

import { useProfile } from "@hooks/useProfile";
import { Menu } from "lucide-react";
import { useState } from "react";
import { MenuMobile } from "../MenuMobile";
import { useNotifications } from "@hooks/useNofitications";

export function Header() {
  const [isOpenMenuMobile, setIsOpenMenuMobile] = useState(false);
  const { profile, isLoading } = useProfile();
  const { notifications } = useNotifications();

  const userConnected = Object.entries(profile).length > 0;

  const fallback = userConnected
    ? profile?.name?.length > 0
      ? profile?.name[0]
      : ""
    : "";

  return (
    <ContainerHeader justify={"center"} width={"100%"} align={"center"}>
      <ContentHeader justify={"between"} align={"center"} width={"100%"}>
        <ContainerLogo align={"center"}>
          {isLoading ? (
            <Skeleton height={"1.6rem"} width={"16rem"} />
          ) : (
            <Flex gap={"2"} align={"center"}>
              <Text weight={"bold"} size={"5"}>
                Cute Workout
              </Text>
            </Flex>
          )}
        </ContainerLogo>

        {isLoading ? (
          <Flex gap={"3"} align={"center"}>
            <Skeleton width={"3.2rem"} height={"3.2rem"} />

            <Flex direction={"column"} gap={"2"}>
              <Skeleton width={"12rem"} height={"1.2rem"} />
              <Skeleton width={"7.8rem"} height={"0.8rem"} />
            </Flex>
          </Flex>
        ) : (
          <Flex align={"center"} gap={"3"}>
            <Flex gap={"3"} align={"center"}>
              <Avatar
                size={"2"}
                src={userConnected ? profile.image : ""}
                fallback={fallback}
                variant="solid"
                color="gray"
                radius="full"
              />

              <Flex direction={"column"} className="info-user">
                <Text size={"3"} weight={"bold"}>
                  {profile?.name}
                </Text>
                {(profile.isBodybuildingStudent || profile.isCoaching) && (
                  <Text size={"1"} weight={"medium"} color="gray">
                    {profile.isBodybuildingStudent ? "Aluno" : "Coach"}
                  </Text>
                )}
              </Flex>

              <IconButton
                variant="ghost"
                color="gray"
                className="menu-mobile"
                onClick={() => setIsOpenMenuMobile((prevState) => !prevState)}
                style={{ position: "relative" }}
              >
                <Menu size={22} />

                {notifications.length > 0 && (
                  <div
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 999999,
                      background: "var(--red-9)",
                      position: "absolute",
                      top: 6,
                      right: 6,
                    }}
                  ></div>
                )}
              </IconButton>
            </Flex>
          </Flex>
        )}
      </ContentHeader>

      {isOpenMenuMobile && (
        <MenuMobile
          saveIsOpenMenuMobile={(value) => setIsOpenMenuMobile(value)}
        />
      )}
    </ContainerHeader>
  );
}
