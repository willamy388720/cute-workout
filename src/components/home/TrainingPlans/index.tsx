import { useTrainingPlans } from "@hooks/useTrainingPlans";
import {
  AccordionContentTraining,
  AccordionTriggerTraining,
  CardExercise,
  ContainerTrainingPlans,
  ImageExercise,
} from "./styles";
import { Button, Flex, Text } from "@radix-ui/themes";
import { Accordion, AccordionItem } from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

type TrainingPlansProps = {};

export function TrainingPlans({}: TrainingPlansProps) {
  const { trainingPlans } = useTrainingPlans();

  const trainingsSorted = trainingPlans.trainings
    ? trainingPlans.trainings.sort((a, b) => a.title.localeCompare(b.title))
    : [];

  const navigate = useNavigate();

  return (
    <ContainerTrainingPlans direction={"column"} gap={"4"} width={"100%"}>
      <Flex justify={"between"}>
        <Text size={"7"} weight={"bold"}>
          Meu Treino
        </Text>

        <Button size={"3"} onClick={() => navigate("/treino/criar")}>
          Editar ou adicionar treino
        </Button>
      </Flex>

      <Accordion type="single" collapsible>
        <Flex direction={"column"} gap={"2"}>
          {trainingsSorted.map((training) => (
            <AccordionItem key={training.id} value={training.title}>
              <AccordionTriggerTraining>
                <Text size={"3"} weight={"medium"}>
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
                  <CardExercise key={exercise.id} direction={"column"}>
                    <ImageExercise src={exercise.image} alt="" />

                    <Text size={"3"} weight={"bold"}>
                      Nome do exercício:{" "}
                      <Text weight={"medium"}>{exercise.name}</Text>
                    </Text>

                    <Text size={"3"} weight={"bold"}>
                      Repetições:{" "}
                      <Text weight={"medium"}>{exercise.repetitions}</Text>
                    </Text>

                    <Text size={"3"} weight={"bold"}>
                      Observação:{" "}
                      <Text weight={"medium"}>{exercise.observation}</Text>
                    </Text>
                  </CardExercise>
                ))}
              </AccordionContentTraining>
            </AccordionItem>
          ))}
        </Flex>
      </Accordion>
    </ContainerTrainingPlans>
  );
}
