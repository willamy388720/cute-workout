import { ExerciseInTrainingDTO } from "./exerciseInTrainingDTO";

export type TrainingDTO = {
  id: string;
  title: string;
  exercises: ExerciseInTrainingDTO[];
};
