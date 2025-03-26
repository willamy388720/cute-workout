import { UserDTO } from "@dtos/userDTO";
import { auth, database } from "@services/firebase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { onAuthStateChanged } from "firebase/auth";
import { get, ref } from "firebase/database";

export function useUser() {
  const { data: user = {} as UserDTO, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  const queryClient = useQueryClient();

  const { mutateAsync: mutationUserFn } = useMutation({
    mutationFn: mutationUser,
    onSuccess(_, variables) {
      queryClient.setQueryData(["user"], () => {
        if (variables.action === "save") {
          const { action, ...user } = variables;
          return user;
        }

        if (variables.action === "delete") {
          return {} as UserDTO;
        }
      });
    },
  });

  async function mutationUser(data: UserDTO & { action: "delete" | "save" }) {
    return data;
  }

  async function getUser() {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const uid = user.uid;

          const data = await get(ref(database, "profiles/" + uid));

          if (data.exists()) {
            const { email } = data.val() as UserDTO;

            return {
              id: uid,
              email,
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
    user,
    isLoading,
    mutationUserFn,
  };
}
