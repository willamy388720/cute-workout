import { EmptyTraining } from "@components/home/EmptyTraining";
import { ContainerHome } from "./styles";
import { Flex, Spinner } from "@radix-ui/themes";
import { useTrainingPlans } from "@hooks/useTrainingPlans";
import { TrainingPlans } from "@components/home/TrainingPlans";
import { useProfile } from "@hooks/useProfile";

export function Home() {
  const { profile } = useProfile();

  const profileId = profile.id ?? "";

  const { trainingPlans, isLoading } = useTrainingPlans({
    profileId,
  });

  const trainingsEmpty = trainingPlans.trainings
    ? trainingPlans.trainings.length === 0
    : true;

  if (isLoading) {
    return (
      <ContainerHome width={"100%"} justify={"center"} align={"center"}>
        <Spinner size={"3"} />
      </ContainerHome>
    );
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
