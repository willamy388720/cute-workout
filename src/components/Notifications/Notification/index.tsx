import { NotificationDTO } from "@dtos/notificationDTO";
import { ContainerNotification } from "./styles";
import { useProfile } from "@hooks/useProfile";
import { Avatar, Button, Flex, Text } from "@radix-ui/themes";
import { Check, X } from "lucide-react";
import { get, ref, remove, update } from "firebase/database";
import { database } from "@services/firebase";
import { useToast } from "@hooks/useToast";
import { useEffect, useState } from "react";
import { ProfileDTO } from "@dtos/profileDTO";

type NotificationProps = {
  notification: NotificationDTO;
};
export function Notification({ notification }: NotificationProps) {
  const [coach, setCoach] = useState<ProfileDTO | null>(null);
  const { profile, mutationProfileFn } = useProfile();
  const { openToast } = useToast();

  const userConnected = Object.entries(profile).length > 0;

  const fallback = coach
    ? coach.name.trim() !== ""
      ? coach.name[0].toUpperCase()
      : ""
    : "";

  async function removeNotification() {
    try {
      if (!profile) throw new Error("Profile does not exist");

      await remove(
        ref(
          database,
          "invitations_sent/" + profile.id + "/invitations/" + notification.id
        )
      );
    } catch (error) {
      openToast({
        isOpen: true,
        title: "Algo inesperado aconteceu",
        content: "Tente novamente",
        error: true,
      });
    }
  }

  async function acceptCoachInvitation() {
    try {
      if (!coach) {
        return;
      }

      if (profile.coachId) {
        openToast({
          isOpen: true,
          title: "Você já tem um treinador",
          content: "Remova-o antes de aceitar um novo",
          error: true,
        });

        return;
      }

      const coachSenderRef = ref(
        database,
        "profiles/" + notification.invitedBy
      );

      const coachSender = await get(coachSenderRef);

      if (!coachSender.exists()) {
        openToast({
          isOpen: true,
          title: "Treinador não existe",
          content: "Não encontramos esse treinador",
          error: true,
        });

        return;
      }

      const bodybuildingStudents: string[] =
        coachSender.val().bodybuildingStudents ?? [];

      const updatedBodybuildingStudents =
        bodybuildingStudents.length > 0
          ? [...bodybuildingStudents, profile.id]
          : [profile.id];

      const currentProfileRef = ref(database, "profiles/" + profile.id);

      await update(currentProfileRef, {
        coachId: coach.id,
        isBodybuildingStudent: true,
      });

      await update(coachSenderRef, {
        bodybuildingStudents: updatedBodybuildingStudents,
      });

      openToast({
        isOpen: true,
        title: "Convite aceito",
        content: "Convite foi aceito com sucesso",
        error: false,
      });

      await removeNotification();

      await mutationProfileFn({
        ...profile,
        coachId: notification.invitedBy,
        isBodybuildingStudent: true,
        action: "save",
      });
    } catch (error) {
      openToast({
        isOpen: true,
        title: "Algo inesperado aconteceu",
        content: "Tente novamente",
        error: true,
      });
    }
  }

  async function getCoach() {
    try {
      const coachRef = ref(database, "profiles/" + notification.invitedBy);
      const coachData = await get(coachRef);

      if (coachData.exists()) {
        const newCoach: ProfileDTO = {
          id: notification.invitedBy,
          email: coachData.val().email,
          name: coachData.val().name,
          image: coachData.val().image,
          weight: coachData.val().weight,
          height: coachData.val().height,
        };

        setCoach(newCoach);
      }
    } catch (error) {
      openToast({
        isOpen: true,
        title: "Algo inesperado aconteceu",
        content: "Tente novamente",
        error: true,
      });
    }
  }

  useEffect(() => {
    getCoach();
  }, []);

  return (
    <ContainerNotification align={"center"}>
      <Flex gap={"3"} align={"center"}>
        <Avatar
          size={"2"}
          src={userConnected ? coach?.image : ""}
          fallback={fallback}
          variant="solid"
          color="gray"
          radius="full"
        />

        <Flex direction={"column"} className="info-user">
          <Text size={"3"} weight={"bold"}>
            {coach?.name}{" "}
            {notification.type === "Invitation" && (
              <Text weight={"regular"}>
                mandou um convite para ser seu treinador
              </Text>
            )}
            {notification.type === "End Of Bond" && (
              <Text weight={"regular"}>encerrou o vinculo com você</Text>
            )}
          </Text>
        </Flex>
      </Flex>

      {notification.type === "Invitation" && (
        <Flex gap={"3"}>
          <Button color="red" onClick={removeNotification}>
            <X size={16} />
            Recusar
          </Button>

          <Button onClick={acceptCoachInvitation}>
            <Check size={16} />
            Aceitar
          </Button>
        </Flex>
      )}

      {notification.type === "End Of Bond" && (
        <Flex gap={"3"}>
          <Button onClick={removeNotification}>
            <Check size={16} />
            Visto
          </Button>
        </Flex>
      )}
    </ContainerNotification>
  );
}
