import { UserDTO } from "@dtos/userDTO";
import { auth, database } from "@services/firebase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { onAuthStateChanged } from "firebase/auth";
import { get, ref } from "firebase/database";

export function useProfile() {
  const { data: profile = {} as UserDTO, isLoading } = useQuery({
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
          return {} as UserDTO;
        }
      });
    },
  });

  async function mutationProfile(
    data: UserDTO & { action: "delete" | "save" }
  ) {
    return data;
  }

  async function getProfile() {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const uid = user.uid;

          const data = await get(ref(database, "profiles/" + uid));

          if (data.exists()) {
            const { email, height, image, weight, name } =
              data.val() as UserDTO;

            return {
              id: uid,
              email,
              name,
              image,
              weight,
              height,
            } as UserDTO;
          }
        } catch (error) {
          return null;
        }
      }
      return null;
    });
  }

  return {
    profile,
    isLoading,
    mutationProfileFn,
  };
}
