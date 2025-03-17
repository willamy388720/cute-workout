import { EmptyTraining } from "@components/home/EmptyTraining";
import { ContainerHome } from "./styles";
import { Flex, Spinner } from "@radix-ui/themes";
import { useTrainingPlans } from "@hooks/useTrainingPlans";
import { TrainingPlans } from "@components/home/TrainingPlans";

export function Home() {
  const { trainingPlans, isLoading } = useTrainingPlans();

  const trainingsEmpty =
    trainingPlans.trainings && trainingPlans.trainings.length === 0;

  if (isLoading) {
    <ContainerHome width={"100%"} justify={"center"} align={"center"}>
      <Spinner size={"3"} />
    </ContainerHome>;
  }

  return (
    <ContainerHome width={"100%"}>
      {trainingsEmpty && (
        <Flex justify={"center"} align={"center"} width={"100%"}>
          <EmptyTraining />
        </Flex>
      )}

      {!trainingsEmpty && <TrainingPlans />}
    </ContainerHome>
  );
}
