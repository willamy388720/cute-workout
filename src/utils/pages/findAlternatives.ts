import Fuse from "fuse.js";
import { ExerciseDTO } from "@dtos/exerciseDTO";

const fuseOptions = {
  keys: ["titleEnglish"],
  threshold: 0.4,
  ignoreLocation: true,
};

export function findAlternatives(
  exerciseBusy: string,
  exercises: ExerciseDTO[],
  excludedIds: string[] = []
): ExerciseDTO[] {
  const original = exercises.find((ex) => ex.title === exerciseBusy);

  if (!original || !original.titileEnglish) return [];

  const originalMuscles = original.primaryMuscles
    .split(",")
    .map((m) => m.trim())
    .filter(Boolean);

  const originalEquipment = original.equipment
    .split(",")
    .map((eq) => eq.trim())
    .filter((eq) => eq !== "Full Gym");

  const candidates = exercises.filter((ex) => {
    const exMuscles = ex.primaryMuscles
      .split(",")
      .map((m) => m.trim())
      .filter(Boolean);

    const exEquipment = ex.equipment
      .split(",")
      .map((eq) => eq.trim())
      .filter((eq) => eq !== "Full Gym");

    const sameMuscles = originalMuscles.every((m) => exMuscles.includes(m));
    const equipmentDifferent = !originalEquipment.some((eq) =>
      exEquipment.includes(eq)
    );

    return (
      sameMuscles &&
      equipmentDifferent &&
      ex.titileEnglish !== original.titileEnglish &&
      !excludedIds.includes(ex.id!) // Exclui IDs já sugeridos
    );
  });

  if (candidates.length === 0) return [];

  const fuse = new Fuse(candidates, fuseOptions);
  const fuseResults = fuse.search(original.titileEnglish, { limit: 3 });

  if (fuseResults.length > 0) {
    return fuseResults.map((result) => ({
      id: result.item.id,
      title: result.item.title,
      titileEnglish: result.item.titileEnglish,
      equipment: result.item.equipment,
      primaryMuscles: result.item.primaryMuscles,
      image: result.item.image,
    }));
  }

  const wordsOriginal = new Set(
    original.titileEnglish
      .replace(/MACHINE|CABLE/gi, "")
      .split(/\s+/)
      .filter((word) => word.length > 2)
  );

  const ranked = candidates
    .map((ex) => {
      if (!ex.titileEnglish) return { ...ex, similarity: 0 };

      const wordsCandidate = new Set(
        ex.titileEnglish
          .replace(/MACHINE|CABLE/gi, "")
          .split(/\s+/)
          .filter((word) => word.length > 2)
      );

      const common = [...wordsOriginal].filter((word) =>
        wordsCandidate.has(word)
      ).length;
      const similarity =
        common / Math.max(wordsOriginal.size, wordsCandidate.size);

      return { ...ex, similarity };
    })
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 3);

  return ranked.map((ex) => ({
    id: ex.id,
    title: ex.title,
    titileEnglish: ex.titileEnglish,
    equipment: ex.equipment,
    primaryMuscles: ex.primaryMuscles,
    image: ex.image,
  }));
}
