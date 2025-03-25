import { useEffect, useState } from "react";
import { Avatar, Button, Flex, Text, TextField } from "@radix-ui/themes";
import { ContainerProfile } from "./styles";
import { useProfile } from "@hooks/useProfile";
import { Controller, useForm } from "react-hook-form";
import { Mail, Pencil } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { maskHeight, maskWeight } from "@utils/masks";
import { useToast } from "@hooks/useToast";
import { ref, update } from "firebase/database";
import { database } from "@services/firebase";

const profileFormSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  height: z.string(),
  weight: z.string(),
});

export type profileFormData = z.infer<typeof profileFormSchema>;

export function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  const { profile } = useProfile();
  const { openToast } = useToast();

  const fallback = profile
    ? profile.name.trim() !== ""
      ? profile.name[0].toUpperCase()
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

  useEffect(() => {
    getInputsProfile();
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
