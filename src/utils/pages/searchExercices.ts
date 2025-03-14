import { ExerciseDTO } from "@dtos/exerciseDTO";

export function searchOnExercises(query: string, exercices: ExerciseDTO[]) {
  const hasQuery = query && typeof query === "string";
  const hasExercices = Array.isArray(exercices) && exercices.length;

  if (!hasQuery || !hasExercices) {
    return [];
  }

  const terms = query
    .split(" ")
    .filter((term) => term.length > 2)
    .map((term) => normalize(term));

  const normalizedexercices = exercices
    .filter((exercice) => exercice.title.length > 2)
    .map((exercice) => {
      return {
        ...exercice,
        titleNormalized: normalize(exercice.title),
      };
    });

  if (!terms.length || !normalizedexercices.length) {
    return [];
  }

  return normalizedexercices.filter((item) => {
    return terms.some((term) => item.titleNormalized.includes(term));
  });
}

function normalize(str: string) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}
