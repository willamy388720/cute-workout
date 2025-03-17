import {
  ChartSpline,
  Dumbbell,
  Goal,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import { Item } from "../Sidebar";
import { ContainerMenuMobile, ItemText, MenuItem } from "./styles";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Flex } from "@radix-ui/themes";
import { useProfile } from "@hooks/useProfile";
import { signOut } from "firebase/auth";
import { auth } from "@services/firebase";

type MenuMobileProps = {
  saveIsOpenMenuMobile: (value: boolean) => void;
};

export function MenuMobile({ saveIsOpenMenuMobile }: MenuMobileProps) {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);

  const { mutationProfileFn, profile } = useProfile();

  const itemsUser: Item[] = [
    {
      path: "/treino",
      name: "Meu Treino",
      icon: <Dumbbell size={30} />,
      disabled: false,
    },
    {
      path: "/perfil",
      name: "Perfil",
      icon: <User size={30} />,
      disabled: false,
    },
    {
      path: "/metas",
      name: "Minhas Metas",
      icon: <Goal size={30} />,
      disabled: true,
    },
    {
      path: "/estatisticas",
      name: "Minhas Estatísticas",
      icon: <ChartSpline size={30} />,
      disabled: true,
    },
    {
      path: "/configuracao",
      name: "Configurações",
      icon: <Settings size={30} />,
      disabled: true,
    },
  ];

  async function handleLogout() {
    try {
      await mutationProfileFn({ ...profile, action: "delete" });
      await signOut(auth);
    } catch (error) {
      throw error;
    }
  }

  return (
    <ContainerMenuMobile direction={"column"} align={"center"}>
      {itemsUser.map((item, index) => (
        <MenuItem
          to={item.path}
          key={index}
          disabled={item.disabled}
          active={item.path === activeItem}
          onClick={() => {
            setActiveItem(item.path);
            saveIsOpenMenuMobile(false);
          }}
        >
          <Flex gap={"4"} align={"center"}>
            {item.icon}
            <ItemText size={"6"} weight={"medium"}>
              {item.name}
            </ItemText>
          </Flex>
        </MenuItem>
      ))}

      <MenuItem
        to={"/signin"}
        onClick={() => {
          saveIsOpenMenuMobile(false);
          handleLogout();
        }}
      >
        <Flex gap={"4"} align={"center"}>
          <LogOut size={30} color={"var(--red-a11)"} />
          <ItemText size={"6"} weight={"medium"} color="red">
            Sair
          </ItemText>
        </Flex>
      </MenuItem>
    </ContainerMenuMobile>
  );
}
