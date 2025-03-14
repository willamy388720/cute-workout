import { env } from "@env/index";
import axios from "axios";

const n8n = axios.create({
  baseURL: env.N8N_URL,
});

type createTrainingPlansProps = {
  userId: string;
  musclePreference: string;
  weeklyFrequency: string;
  durationTime: string;
  discomfort: string;
  healthProblem: string;
  timeForAerobicExercise: string;
};

export async function createTrainingPlans({
  userId,
  musclePreference,
  weeklyFrequency,
  durationTime,
  discomfort,
  healthProblem,
  timeForAerobicExercise,
}: createTrainingPlansProps) {
  try {
    const discomfortFormatted =
      discomfort.trim() === "" ? "nenhum" : discomfort;
    const healthProblemFormatted =
      healthProblem.trim() === "" ? "nenhum" : healthProblem;
    const timeForAerobicExerciseFormatted =
      timeForAerobicExercise.trim() === "" ? "nenhum" : timeForAerobicExercise;

    const response = await n8n.post("/exercises", {
      user_id: userId,
      input: `Preferência muscular: ${musclePreference}; Frequência semanal: ${weeklyFrequency} dias; Tempo de duração: ${durationTime} minutos; Desconforto: ${discomfortFormatted}; Problema de saúde: ${healthProblemFormatted}; Tempo para exercício aeróbico: ${timeForAerobicExerciseFormatted};`,
    });

    return response;
  } catch (error) {
    throw error;
  }
}
