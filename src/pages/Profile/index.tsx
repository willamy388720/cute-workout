import { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Flex,
  IconButton,
  Text,
  TextField,
} from "@radix-ui/themes";
import { ContainerProfile } from "./styles";
import { useProfile } from "@hooks/useProfile";
import { Controller, useForm } from "react-hook-form";
import { Mail, Pencil, UserX } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { maskHeight, maskWeight } from "@utils/masks";
import { useToast } from "@hooks/useToast";
import { get, ref, set, update } from "firebase/database";
import { database } from "@services/firebase";
import { ProfileDTO } from "@dtos/profileDTO";
import { v4 as uuidv4 } from "uuid";

const profileFormSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  height: z.string(),
  weight: z.string(),
});

export type profileFormData = z.infer<typeof profileFormSchema>;

export function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [coach, setCoach] = useState<ProfileDTO | null>(null);

  const { profile, mutationProfileFn } = useProfile();
  const { openToast } = useToast();

  const fallback = profile
    ? profile.name.trim() !== ""
      ? profile.name[0].toUpperCase()
      : ""
    : "";

  const fallbackCoach = coach
    ? coach.name.trim() !== ""
      ? coach.name[0].toUpperCase()
      : ""
    : "";

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<profileFormData>({
    resolver: zodResolver(profileFormSchema),
  });

  function handleChangeHeight(
    value: string,
    onChange: (...event: any[]) => void
  ) {
    const heightValue = maskHeight(value);

    onChange(heightValue);
  }

  function handleChangeWeight(
    value: string,
    onChange: (...event: any[]) => void
  ) {
    const heightValue = maskWeight(value);

    onChange(heightValue);
  }

  function handleCancelEditing() {
    setValue("name", profile.name);
    setValue("height", profile.height);
    setValue("weight", profile.weight);
    setIsEditing(false);
  }

  function getInputsProfile() {
    if (!profile) return;

    setValue("email", profile.email);
    setValue("name", profile.name);
    setValue("height", profile.height);
    setValue("weight", profile.weight);
  }

  async function getCoach() {
    if (!profile) return;

    if (!profile.coachId) return;

    try {
      const coachRef = ref(database, "profiles/" + profile.coachId);

      const coachData = await get(coachRef);

      const dataFormatted: ProfileDTO = {
        id: profile.coachId,
        email: coachData.val().email,
        name: coachData.val().name,
        image: coachData.val().image,
        height: coachData.val().height,
        weight: coachData.val().weight,
        bodybuildingStudents: coachData.val().bodybuildingStudents,
      };

      setCoach(dataFormatted);
    } catch (error) {
      openToast({
        isOpen: true,
        title: "Algo inesperado aconteceu",
        content: "Tente novamente",
        error: true,
      });
    }
  }

  async function onSubmitProfile(data: profileFormData) {
    try {
      update(ref(database, "profiles/" + profile.id), {
        name: data.name,
        height: data.height,
        weight: data.weight,
      });

      openToast({
        isOpen: true,
        title: "Perfil Atualizado",
        content: "Dados do perfil atualizado com sucesso",
        error: false,
      });

      setIsEditing(false);
    } catch (error) {
      openToast({
        isOpen: true,
        title: "Algo inesperado aconteceu",
        content: "Tente novamente",
        error: true,
      });
    }
  }

  async function removeCoach() {
    if (!profile) return;
    if (!coach) return;

    try {
      const bodybuildingStudents: string[] = coach.bodybuildingStudents ?? [];

      const bodybuildingStudentsFiltered = bodybuildingStudents.filter(
        (student) => student !== profile.id
      );

      await update(ref(database, "profiles/" + coach.id), {
        bodybuildingStudents: bodybuildingStudentsFiltered,
      });

      await update(ref(database, "profiles/" + profile.id), {
        isBodybuildingStudent: false,
        coachId: "",
      });

      await set(
        ref(
          database,
          "invitations_sent/" + coach.id + "/invitations/" + uuidv4()
        ),
        {
          invitedBy: profile.id,
          sentAt: new Date().toISOString(),
          type: "End Of Bond",
        }
      );

      await mutationProfileFn({
        ...profile,
        coachId: "",
        isBodybuildingStudent: false,
        action: "save",
      });

      openToast({
        isOpen: true,
        title: "Coach removido",
        content: "O coach foi removido com sucesso",
        error: false,
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

  useEffect(() => {
    getInputsProfile();
    getCoach();
  }, [profile]);

  return (
    <ContainerProfile justify={"center"} align={"center"}>
      <Flex direction={"column"} gap={"5"}>
        <Flex
          direction={"column"}
          align={"center"}
          gap={"4"}
          width={"100%"}
          style={{ width: 300 }}
        >
          <Flex direction={"column"} gap={"2"} align={"center"}>
            <Avatar
              size={"9"}
              src={profile.image ?? ""}
              fallback={fallback}
              variant="solid"
              color="gray"
              radius="full"
            />

            {profile.isCoaching && (
              <Text size={"3"} weight={"bold"}>
                Coach
              </Text>
            )}

            {profile.isBodybuildingStudent && (
              <Text size={"3"} weight={"bold"}>
                Aluno
              </Text>
            )}
          </Flex>

          {profile.isBodybuildingStudent && (
            <Flex gap={"2"} direction={"column"} width={"100%"}>
              <Text
                size={"3"}
                weight={"medium"}
                style={{ color: "var(--gray-8)" }}
              >
                Coach
              </Text>

              <Flex justify={"between"}>
                <Flex gap={"3"} align={"center"}>
                  <Avatar
                    size={"2"}
                    src={coach?.image ?? ""}
                    fallback={fallbackCoach}
                    variant="solid"
                    color="gray"
                    radius="full"
                  />

                  <Text size={"3"} weight={"bold"}>
                    {coach?.name}
                  </Text>
                </Flex>

                <IconButton
                  color="red"
                  disabled={isEditing}
                  onClick={removeCoach}
                >
                  <UserX size={16} />
                </IconButton>
              </Flex>
            </Flex>
          )}

          <Flex gap={"2"} direction={"column"} width={"100%"}>
            <Text
              size={"3"}
              weight={"medium"}
              style={{ color: "var(--gray-8)" }}
            >
              Email
            </Text>

            <Controller
              control={control}
              name="email"
              disabled
              render={({ field: { onChange, value } }) => (
                <TextField.Root
                  placeholder="Digite seu email"
                  size={"3"}
                  value={value}
                  onChange={onChange}
                  disabled
                  color={errors.email ? "red" : "blue"}
                  style={{ width: "100%" }}
                >
                  <TextField.Slot>
                    <Mail size={16} color="var(--gray-8)" />
                  </TextField.Slot>
                </TextField.Root>
              )}
            />
          </Flex>

          <Flex gap={"2"} direction={"column"} width={"100%"}>
            <Text
              size={"3"}
              weight={"medium"}
              style={{ color: isEditing ? "var(--gray-12)" : "var(--gray-8)" }}
            >
              Nome
            </Text>

            <Controller
              control={control}
              name="name"
              disabled={!isEditing}
              render={({ field: { onChange, value } }) => (
                <TextField.Root
                  placeholder="Digite seu nome"
                  size={"3"}
                  value={value}
                  onChange={onChange}
                  disabled={!isEditing}
                  color={errors.name ? "red" : "blue"}
                  style={{ width: "100%" }}
                ></TextField.Root>
              )}
            />
          </Flex>

          <Flex gap={"2"} direction={"column"} width={"100%"}>
            <Text
              size={"3"}
              weight={"medium"}
              style={{ color: isEditing ? "var(--gray-12)" : "var(--gray-8)" }}
            >
              Altura (cm)
            </Text>

            <Controller
              control={control}
              name="height"
              disabled={!isEditing}
              render={({ field: { onChange, value } }) => (
                <TextField.Root
                  placeholder="Ex.: 170"
                  size={"3"}
                  value={value}
                  onChange={(e) => handleChangeHeight(e.target.value, onChange)}
                  disabled={!isEditing}
                  color={errors.height ? "red" : "blue"}
                  style={{ width: "100%" }}
                ></TextField.Root>
              )}
            />
          </Flex>

          <Flex gap={"2"} direction={"column"} width={"100%"}>
            <Text
              size={"3"}
              weight={"medium"}
              style={{ color: isEditing ? "var(--gray-12)" : "var(--gray-8)" }}
            >
              Peso (kg)
            </Text>

            <Controller
              control={control}
              name="weight"
              disabled={!isEditing}
              render={({ field: { onChange, value } }) => (
                <TextField.Root
                  placeholder="Ex.: 81.2"
                  size={"3"}
                  value={value}
                  onChange={(e) => handleChangeWeight(e.target.value, onChange)}
                  disabled={!isEditing}
                  color={errors.weight ? "red" : "blue"}
                  style={{ width: "100%" }}
                ></TextField.Root>
              )}
            />
          </Flex>
        </Flex>

        {!isEditing && (
          <Flex width={"100%"}>
            <Button
              size={"3"}
              style={{ width: "100%" }}
              onClick={() => setIsEditing(true)}
            >
              <Pencil size={16} />
              Editar
            </Button>
          </Flex>
        )}

        {isEditing && (
          <Flex width={"100%"} gap={"4"}>
            <Button
              size={"3"}
              style={{ flex: 1 }}
              variant="outline"
              color="gray"
              onClick={handleCancelEditing}
            >
              Cancelar
            </Button>

            <Button
              size={"3"}
              style={{ flex: 1 }}
              onClick={handleSubmit(onSubmitProfile)}
            >
              Salvar
            </Button>
          </Flex>
        )}
      </Flex>
    </ContainerProfile>
  );
}
