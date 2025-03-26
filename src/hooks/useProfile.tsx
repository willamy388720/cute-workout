import { ProfileDTO } from "@dtos/profileDTO";
import { auth, database } from "@services/firebase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { onAuthStateChanged } from "firebase/auth";
import { get, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useUser } from "./useUser";

export function useProfile() {
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();

  const { data: profile = {} as ProfileDTO } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const queryClient = useQueryClient();

  const { mutateAsync: mutationProfileFn } = useMutation({
    mutationFn: mutationProfile,
    onSuccess(_, variables) {
      queryClient.setQueryData(["profile"], () => {
        if (variables.action === "save") {
          const { action, ...profile } = variables;
          return profile;
        }

        if (variables.action === "delete") {
          return {} as ProfileDTO;
        }
      });
    },
  });

  async function mutationProfile(
    data: ProfileDTO & { action: "delete" | "save" }
  ) {
    return data;
  }

  async function getProfile() {
    onAuthStateChanged(auth, async (userConnected) => {
      if (userConnected) {
        try {
          const uid = userConnected.uid;

          const data = await get(ref(database, "profiles/" + uid));

          if (data.exists()) {
            const { email, height, image, weight, name } =
              data.val() as ProfileDTO;

            return {
              id: uid,
              email,
              name,
              image,
              weight,
              height,
            } as ProfileDTO;
          }
        } catch (error) {
          return null;
        }
      }
      return null;
    });
  }

  useEffect(() => {
    if (!user.id) return;
    const profileRef = ref(database, "profiles/" + user.id);

    const unsubscribe = onValue(profileRef, async (snapshot) => {
      if (snapshot.exists()) {
        await mutationProfileFn({
          id: user.id,
          email: snapshot.val().email,
          name: snapshot.val().name,
          image: snapshot.val().image,
          weight: snapshot.val().weight,
          height: snapshot.val().height,
          bodybuildingStudents: snapshot.val().bodybuildingStudents,
          isBodybuildingStudent: snapshot.val().isBodybuildingStudent,
          isCoaching: snapshot.val().isCoaching,
          coachId: snapshot.val().coachId,
          action: "save",
        });
      } else {
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  return {
    profile,
    isLoading,
    mutationProfileFn,
  };
}
