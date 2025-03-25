import { Button, Dialog, Flex, Heading, Spinner, Text } from "@radix-ui/themes";
import { Bot, Dumbbell, Pencil } from "lucide-react";
import { CardtTypeOfCreation } from "./styles";
import { useEffect, useState } from "react";
import { FormAITraining } from "../FormAITraining";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@hooks/useToast";
import { useProfile } from "@hooks/useProfile";
import { createTrainingPlans } from "@services/n8n";
import { useTrainingPlans } from "@hooks/useTrainingPlans";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { v4 as uuid } from "uuid";

const aiFormSchema = z.object({
  musclePreference: z.string().min(1, "Muscle preference is required"),
  weeklyFrequency: z
    .string()
    .min(1, { message: "Weekly frequency is required" }),
  durationTime: z.string().min(1, { message: "Duration time is required" }),
  discomfort: z.string(),
  healthProblem: z.string(),
  timeForAerobicExercise: z.string(),
});

export type AIFormData = z.infer<typeof aiFormSchema>;

export function EmptyTraining() {
  const [typeOfCreation, setTypeOfCreation] = useState<"AI" | "MANUAL">("AI");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [step, setStep] = useState(1);

  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });
  const isMobileXS = useMediaQuery({ query: "(max-width: 540px)" });

  const { openToast } = useToast();

  const { profile } = useProfile();

  const profileId = profile.id ?? "";

  const { trainingPlans } = useTrainingPlans({ profileId });

  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AIFormData>({
    resolver: zodResolver(aiFormSchema),
    defaultValues: {
      discomfort: "",
      durationTime: "",
      healthProblem: "",
      musclePreference: "",
      timeForAerobicExercise: "",
      weeklyFrequency: "1",
    },
  });

  function handleNextStep() {
    if (typeOfCreation === "AI" && step === 1) {
      setStep(2);
    }

    if (typeOfCreation === "MANUAL" && step === 1) {
      setIsOpenModal(false);
      navigate(`/treino/criar/${uuid()}`);
    }
  }

  function onInvalid() {
    openToast({
      isOpen: true,
      title: "Campos obrigatórios",
      content: "Preencha os campos obrigatórios para fazer o criar o treino",
      error: true,
    });
  }

  async function onSubmit(data: AIFormData) {
    setIsLoading(true);

    try {
      await createTrainingPlans({
        userId: profile.id,
        musclePreference: data.musclePreference,
        weeklyFrequency: data.weeklyFrequency,
        durationTime: data.durationTime,
        discomfort: data.discomfort,
        healthProblem: data.healthProblem,
        timeForAerobicExercise: data.timeForAerobicExercise,
      });

      openToast({
        isOpen: true,
        title: "Dados enviados",
        content: "Por favor aguarde",
        error: false,
      });
    } catch (error) {
      openToast({
        isOpen: true,
        title: "Algo inesperado aconteceu",
        content: "Tente novamente",
        error: false,
      });
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (isLoading && trainingPlans.trainings) {
      setIsLoading(false);
      setIsOpenModal(false);
    }
  }, [trainingPlans]);

  return (
    <Dialog.Root open={isOpenModal}>
      <Dialog.Content>
        <Dialog.Title>Criar Novo Treino</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Escolha como você deseja criar seu novo treino
        </Dialog.Description>

        {step === 1 && (
          <Flex
            direction={isMobileXS ? "column" : "row"}
            gap={isMobile ? "4" : "6"}
            justify={"center"}
            align={"center"}
          >
            <CardtTypeOfCreation
              selected={typeOfCreation === "AI"}
              direction={"column"}
              align={"center"}
              gap="4"
              onClick={() => setTypeOfCreation("AI")}
            >
              <Bot
                size={isMobile ? 40 : 50}
                color={
                  typeOfCreation === "AI" ? "var(--accent-9)" : "var(--gray-12)"
                }
              />

              <Flex direction={"column"} align={"center"} gap={"3"}>
                <Text
                  weight={"bold"}
                  size={isMobile ? "3" : "5"}
                  align={"center"}
                  style={{
                    color:
                      typeOfCreation === "AI"
                        ? "var(--accent-9)"
                        : "var(--gray-12)",
                  }}
                >
                  Criar com IA
                </Text>

                <Text align={"center"} color="gray">
                  Gere um treino personalizado baseado nas suas necessidades
                </Text>
              </Flex>
            </CardtTypeOfCreation>

            <CardtTypeOfCreation
              selected={typeOfCreation === "MANUAL"}
              direction={"column"}
              align={"center"}
              gap="4"
              onClick={() => setTypeOfCreation("MANUAL")}
            >
              <Pencil
                size={isMobile ? 40 : 50}
                color={
                  typeOfCreation === "MANUAL"
                    ? "var(--accent-9)"
                    : "var(--gray-12)"
                }
              />

              <Flex direction={"column"} align={"center"} gap={"3"}>
                <Text
                  weight={"bold"}
                  size={isMobile ? "3" : "5"}
                  align={"center"}
                  style={{
                    color:
                      typeOfCreation === "MANUAL"
                        ? "var(--accent-9)"
                        : "var(--gray-12)",
                  }}
                >
                  Criar Manualmente
                </Text>

                <Text align={"center"} color="gray">
                  Monte seu próprio treino definindo cada exercício
                </Text>
              </Flex>
            </CardtTypeOfCreation>
          </Flex>
        )}

        {step === 2 && !isLoading && (
          <FormAITraining control={control} errors={errors} watch={watch} />
        )}

        {isLoading && (
          <Flex align={"center"} gap={"2"} justify={"center"}>
            <Spinner size={"3"} />
            <Text>Criando treino...</Text>
          </Flex>
        )}

        {!isLoading && (
          <Flex gap="3" mt="4" justify="end">
            {step === 1 && (
              <Button
                variant="soft"
                color="gray"
                onClick={() => {
                  setStep(1);
                  setIsOpenModal(false);
                }}
              >
                Cancelar
              </Button>
            )}

            {step === 2 && (
              <Button
                variant="soft"
                color="gray"
                onClick={() => setStep(1)}
                disabled={isLoading}
              >
                Voltar
              </Button>
            )}

            {step !== 2 && <Button onClick={handleNextStep}>Avançar</Button>}

            {typeOfCreation === "AI" && step === 2 && (
              <Button
                disabled={isLoading}
                onClick={handleSubmit(onSubmit, onInvalid)}
                loading={isLoading}
              >
                Criar
              </Button>
            )}
          </Flex>
        )}
      </Dialog.Content>

      <Flex direction={"column"} align={"center"} gap={"3"}>
        <Dumbbell size={100} color="var(--gray-9)" />

        <Flex direction={"column"} align={"center"}>
          <Heading>Treino vazio</Heading>
          {!profile.isBodybuildingStudent && (
            <Text>Cadastre seus treinos aqui</Text>
          )}

          {profile.isBodybuildingStudent && (
            <Text>Espere o seu coach passar o treino</Text>
          )}
        </Flex>

        {!profile.isBodybuildingStudent && (
          <Button size={"3"} onClick={() => setIsOpenModal(true)}>
            Adicionar treino
          </Button>
        )}
      </Flex>
    </Dialog.Root>
  );
}
