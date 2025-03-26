import { ExerciseInTrainingDTO } from "./exerciseInTrainingDTO";

export type TrainingDTO = {
  id: string;
  title: string;
  orderNumber: number;
  exercises: ExerciseInTrainingDTO[];
};
