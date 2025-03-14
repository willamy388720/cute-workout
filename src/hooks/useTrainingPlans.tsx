import { ExerciseInTrainingDTO } from "@dtos/exerciseInTrainingDTO";
import { TrainingDTO } from "@dtos/trainingDTO";
import { TrainingPlansDTO } from "@dtos/trainingPlansDTO";
import { database } from "@services/firebase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { onValue, ref } from "firebase/database";
import { useEffect } from "react";
import { useProfile } from "./useProfile";

export function useTrainingPlans() {
  const { data: trainingPlans = {} as TrainingPlansDTO, isLoading } = useQuery({
    queryKey: ["trainingPlans"],
    queryFn: () => {},
  });

  const queryClient = useQueryClient();

  const { profile } = useProfile();

  const { mutateAsync: mutationTrainingPlansFn } = useMutation({
    mutationFn: mutationTrainingPlans,
    onSuccess(_, variables) {
      queryClient.setQueryData(["trainingPlans"], () => {
        if (variables.action === "save") {
          const { action, ...trainingPlans } = variables;
          return trainingPlans;
        }

        if (variables.action === "delete") {
          return {} as TrainingPlansDTO;
        }
      });
    },
  });

  async function mutationTrainingPlans(
    data: TrainingPlansDTO & { action: "delete" | "save" }
  ) {
    return data;
  }

  useEffect(() => {
    const trainingPlansRef = ref(database, "training_plans/" + profile.id);

    const unsubscribe = onValue(trainingPlansRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const dataFormatted: TrainingPlansDTO = {
          id: profile.id,
          trainings: Object.entries<TrainingDTO>(data.trainings ?? {}).map(
            ([id, value]) => ({
              id,
              title: value.title,
              exercises: Object.entries<ExerciseInTrainingDTO>(
                value.exercises ?? {}
              ).map(([id, value]) => ({
                id,
                name: value.name,
                image: value.image,
                machine: value.machine,
                observation: value.observation,
                primaryMuscles: value.primaryMuscles,
                repetitions: value.repetitions,
              })),
            })
          ),
        };

        mutationTrainingPlansFn({ action: "save", ...dataFormatted });
      } else {
        mutationTrainingPlansFn({
          action: "save",
          ...({} as TrainingPlansDTO),
        });
      }
    });

    return () => unsubscribe();
  }, [profile]);

  return {
    trainingPlans,
    isLoading,
    mutationTrainingPlansFn,
  };
}
