import {
  Bell,
  ChartSpline,
  Dumbbell,
  Goal,
  LogOut,
  Settings,
  User,
  Users,
} from "lucide-react";
import { Item } from "../Sidebar";
import { ContainerMenuMobile, ItemText, MenuItem } from "./styles";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Badge, Flex } from "@radix-ui/themes";
import { useProfile } from "@hooks/useProfile";
import { signOut } from "firebase/auth";
import { auth } from "@services/firebase";
import { useNotifications } from "@hooks/useNofitications";

type MenuMobileProps = {
  saveIsOpenMenuMobile: (value: boolean) => void;
};

export function MenuMobile({ saveIsOpenMenuMobile }: MenuMobileProps) {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);

  const { mutationProfileFn, profile } = useProfile();

  const { notifications } = useNotifications();

  const itemsUser: Item[] = [
    {
      path: "/treino",
      name: "Meu Treino",
      icon: <Dumbbell size={18} />,
      disabled: false,
      show: true,
    },
    {
      path: "/perfil",
      name: "Perfil",
      icon: <User size={18} />,
      disabled: false,
      show: true,
    },
    {
      path: "/alunos",
      name: "Meus alunos",
      icon: <Users size={18} />,
      disabled: false,
      show: profile.isCoaching ? profile.isCoaching : false,
    },
    {
      path: "/notificacoes",
      name: "Notificações",
      icon: <Bell size={18} />,
      disabled: false,
      show: true,
    },
    {
      path: "/metas",
      name: "Minhas Metas",
      icon: <Goal size={18} />,
      disabled: true,
      show: true,
    },
    {
      path: "/estatisticas",
      name: "Minhas Estatísticas",
      icon: <ChartSpline size={18} />,
      disabled: true,
      show: true,
    },
    {
      path: "/configuracao",
      name: "Configurações",
      icon: <Settings size={18} />,
      disabled: true,
      show: true,
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
      {itemsUser.map(
        (item, index) =>
          item.show && (
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

              {item.name === "Notificações" && notifications.length > 0 && (
                <Badge color="red" variant="solid" radius="full">
                  {notifications.length}
                </Badge>
              )}
            </MenuItem>
          )
      )}

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
