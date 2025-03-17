import { useState, useEffect } from "react";
import { ExerciseDTO } from "@dtos/exerciseDTO";
import { database } from "@services/firebase";
import { ref, onValue } from "firebase/database";

export function useExercises() {
  const [exercises, setExercises] = useState<ExerciseDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const categoriesRef = ref(database, "exercises/");

    const unsubscribe = onValue(categoriesRef, (snapshot) => {
      if (snapshot.exists()) {
        const dataFormatted = Object.entries<ExerciseDTO>(
          snapshot.val() ?? {}
        ).map(([id, value]) => ({
          id,
          title: value.title,
          titileEnglish: value.titileEnglish,
          equipment: value.equipment,
          primaryMuscles: value.primaryMuscles,
          image: value.image,
        }));

        setExercises(dataFormatted);
      } else {
        setExercises([]);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return {
    exercises,
    isLoading,
  };
}
