import { useTrainingPlans } from "@hooks/useTrainingPlans";
import {
  AccordionContentTraining,
  AccordionTriggerTraining,
  CardExercise,
  ContainerTrainingPlans,
  ContenteAlternativeExercises,
  ImageExercise,
} from "./styles";
import { Button, Dialog, Flex, IconButton, Text } from "@radix-ui/themes";
import { Accordion, AccordionItem } from "@radix-ui/react-accordion";
import { ChevronDown, Pencil, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ExerciseInTrainingDTO } from "@dtos/exerciseInTrainingDTO";
import { useToast } from "@hooks/useToast";
import { findAlternatives } from "@utils/pages/findAlternatives";
import { useExercises } from "@hooks/useExercises";
import { useState } from "react";
import { useProfile } from "@hooks/useProfile";

type TrainingPlansProps = {};

export function TrainingPlans({}: TrainingPlansProps) {
  const [alternativeExercises, setAlternativeExercises] = useState<
    ExerciseInTrainingDTO[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [originalExercise, setOriginalExercise] =
    useState<ExerciseInTrainingDTO | null>(null);

  const { exercises } = useExercises();

  const { profile } = useProfile();

  const profileId = profile.id ?? "";

  const { trainingPlans } = useTrainingPlans({ profileId });

  const trainingsSorted = trainingPlans.trainings
    ? trainingPlans.trainings.sort((a, b) => a.title.localeCompare(b.title))
    : [];

  const navigate = useNavigate();

  const { openToast } = useToast();

  async function handleFindAlternativeExercise(
    exercise: ExerciseInTrainingDTO
  ) {
    try {
      const alternativeExercisesFound = findAlternatives(
        exercise.name,
        exercises
      );

      const newAlternativeExercises: ExerciseInTrainingDTO[] =
        alternativeExercisesFound.map((item) => {
          return {
            id: item.id!,
            image: item.image,
            primaryMuscles: item.primaryMuscles,
            machine: item.equipment,
            name: item.title,
            observation: "",
            repetitions: exercise.repetitions,
          };
        });

      setAlternativeExercises(newAlternativeExercises);
      setOriginalExercise(exercise);
    } catch (error) {
      openToast({
        isOpen: true,
        title: "Algo inesperado aconteceu",
        content: "Tente novamente",
        error: true,
      });
    }
  }

  async function handleFindNewAlternativeExercise() {
    if (!originalExercise) return;

    setIsLoading(true);
    try {
      const excludedIds = alternativeExercises.map((item) => item.id);

      const alternativeExercisesFound = findAlternatives(
        originalExercise.name,
        exercises,
        excludedIds
      );

      const newAlternativeExercises: ExerciseInTrainingDTO[] =
        alternativeExercisesFound.map((item) => {
          return {
            id: item.id!,
            image: item.image,
            primaryMuscles: item.primaryMuscles,
            machine: item.equipment,
            name: item.title,
            observation: "",
            repetitions: originalExercise.repetitions,
          };
        });

      setAlternativeExercises(newAlternativeExercises);
    } catch (error) {
      openToast({
        isOpen: true,
        title: "Algo inesperado aconteceu",
        content: "Tente novamente",
        error: true,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Content>
        <Dialog.Title>Exercícios Alternativos</Dialog.Title>

        <ContenteAlternativeExercises direction="column" gap="3">
          {alternativeExercises.map((exercise) => (
            <CardExercise key={exercise.id} direction={"column"}>
              <ImageExercise src={exercise.image} alt="" />

              <Text size={"3"} weight={"bold"} align={"center"}>
                {exercise.name}
              </Text>

              <Text size={"3"} weight={"bold"}>
                Repetições:{" "}
                <Text weight={"medium"}>{exercise.repetitions}</Text>
              </Text>

              {exercise.observation && (
                <Text size={"3"} weight={"bold"}>
                  Observação:{" "}
                  <Text weight={"medium"}>{exercise.observation}</Text>
                </Text>
              )}
            </CardExercise>
          ))}
        </ContenteAlternativeExercises>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close onClick={() => setOriginalExercise(null)}>
            <Button variant="soft" color="gray" disabled={isLoading}>
              Cancelar
            </Button>
          </Dialog.Close>

          <Button
            onClick={handleFindNewAlternativeExercise}
            disabled={isLoading}
            loading={isLoading}
          >
            Gerar novamente
          </Button>
        </Flex>
      </Dialog.Content>

      <ContainerTrainingPlans direction={"column"} gap={"4"} width={"100%"}>
        <Flex justify={"between"}>
          <Text size={"7"} weight={"bold"}>
            Meu Treino
          </Text>

          {!profile.isBodybuildingStudent && (
            <Button
              size={"3"}
              onClick={() => navigate(`/treino/criar/${profile.id}`)}
              className="home-button-edit-training-desktop"
            >
              Editar ou adicionar treino
            </Button>
          )}

          <IconButton
            size={"3"}
            onClick={() => navigate("/treino/criar")}
            className="home-button-edit-training-mobile"
          >
            <Pencil size={16} />
          </IconButton>
        </Flex>

        <Accordion type="single" collapsible>
          <Flex direction={"column"} gap={"2"}>
            {trainingsSorted.map((training) => (
              <AccordionItem key={training.id} value={training.title}>
                <AccordionTriggerTraining>
                  <Text
                    size={"3"}
                    weight={"medium"}
                    className="accordion-title"
                  >
                    {training.title}
                  </Text>

                  <ChevronDown
                    size={24}
                    className="AccordionChevron"
                    color="var(--gray-9)"
                  />
                </AccordionTriggerTraining>

                <AccordionContentTraining>
                  {training.exercises.map((exercise) => (
                    <CardExercise
                      key={exercise.id}
                      direction={"column"}
                      justify={"between"}
                    >
                      <ImageExercise src={exercise.image} alt="" />

                      <Text size={"3"} weight={"bold"} align={"center"}>
                        {exercise.name}
                      </Text>

                      <Text size={"3"} weight={"bold"}>
                        Repetições:{" "}
                        <Text weight={"medium"}>{exercise.repetitions}</Text>
                      </Text>

                      {exercise.observation && (
                        <Text size={"3"} weight={"bold"}>
                          Observação:{" "}
                          <Text weight={"medium"}>{exercise.observation}</Text>
                        </Text>
                      )}

                      <Dialog.Trigger
                        onClick={() => handleFindAlternativeExercise(exercise)}
                      >
                        <Button size={"3"} variant="soft">
                          <Search size={16} />
                          Exercício alternativo
                        </Button>
                      </Dialog.Trigger>
                    </CardExercise>
                  ))}
                </AccordionContentTraining>
              </AccordionItem>
            ))}
          </Flex>
        </Accordion>
      </ContainerTrainingPlans>
    </Dialog.Root>
  );
}
