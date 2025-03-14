import { EmptyTraining } from "@components/home/EmptyTraining";
import { ContainerHome } from "./styles";
import { Flex } from "@radix-ui/themes";
import { useTrainingPlans } from "@hooks/useTrainingPlans";
import { TrainingPlans } from "@components/home/TrainingPlans";

export function Home() {
  const { trainingPlans } = useTrainingPlans();

  return (
    <ContainerHome width={"100%"}>
      {!trainingPlans.trainings && (
        <Flex justify={"center"} align={"center"} width={"100%"}>
          <EmptyTraining />
        </Flex>
      )}

      {trainingPlans.trainings && <TrainingPlans />}
    </ContainerHome>
  );
}
