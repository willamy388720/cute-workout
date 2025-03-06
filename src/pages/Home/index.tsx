import { useProfile } from "@hooks/useProfile";
import { ContainerHome } from "./styles";
import { Button } from "@radix-ui/themes";
import { useToast } from "@hooks/useToast";
import { signOut } from "firebase/auth";
import { auth } from "@services/firebase";

export function Home() {
  const { profile, mutationProfileFn } = useProfile();

  const { openToast } = useToast();

  async function handleLogout() {
    try {
      await signOut(auth);

      mutationProfileFn({ ...profile, action: "delete" });
    } catch (error) {
      console.error(error);
      openToast({
        isOpen: true,
        title: "Algo inesperado aconteceu",
        content: "Tente novamente",
        error: true,
      });
    }
  }

  console.log(profile.image);

  return <ContainerHome></ContainerHome>;
}
