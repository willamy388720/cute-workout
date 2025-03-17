import { ReactElement, useState } from "react";
import {
  ArrowLeftToLine,
  ArrowRightToLine,
  ChartSpline,
  Dumbbell,
  Goal,
  LogOut,
  Settings,
  User,
} from "lucide-react";

import {
  Bar,
  CollapsedSidebar,
  ContainerSidebar,
  ItemText,
  MenuItem,
} from "./styles";

import { Flex, Separator } from "@radix-ui/themes";
import { useSidebar } from "@hooks/useSidebar";

import { useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "@services/firebase";
import { useProfile } from "@hooks/useProfile";

export type Item = {
  path: string;
  name: string;
  icon: ReactElement;
  disabled: boolean;
};

export function Sidebar() {
  const { collapsed, toggleSidebar } = useSidebar();

  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);

  const { profile, mutationProfileFn } = useProfile();

  const itemsUser: Item[] = [
    {
      path: "/treino",
      name: "Meu Treino",
      icon: <Dumbbell size={18} />,
      disabled: false,
    },
    {
      path: "/perfil",
      name: "Perfil",
      icon: <User size={18} />,
      disabled: false,
    },
    {
      path: "/metas",
      name: "Minhas Metas",
      icon: <Goal size={18} />,
      disabled: true,
    },
    {
      path: "/estatisticas",
      name: "Minhas Estatísticas",
      icon: <ChartSpline size={18} />,
      disabled: true,
    },
    {
      path: "/configuracao",
      name: "Configurações",
      icon: <Settings size={18} />,
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
    <ContainerSidebar>
      <Bar justify={"between"} collapsed={collapsed}>
        <Flex direction={"column"} gap={"1"} mt={"2"}>
          {itemsUser.map((item, index) => (
            <MenuItem
              to={item.path}
              key={index}
              disabled={item.disabled}
              active={item.path === activeItem}
              onClick={() => setActiveItem(item.path)}
              collapsed={collapsed}
            >
              <Flex gap={"2"} align={"center"}>
                {item.icon}
                <ItemText
                  size={"2"}
                  style={{ display: collapsed ? "none" : "block" }}
                  weight={"medium"}
                >
                  {item.name}
                </ItemText>
              </Flex>
            </MenuItem>
          ))}

          <Separator size={"4"} my={"2"} />

          <MenuItem to={"/signin"} collapsed={collapsed} onClick={handleLogout}>
            <Flex gap={"2"} align={"center"}>
              <LogOut size={18} color="var(--red-a11)" />
              <ItemText
                size={"2"}
                style={{ display: collapsed ? "none" : "block" }}
                weight={"medium"}
                color="red"
              >
                Sair
              </ItemText>
            </Flex>
          </MenuItem>
        </Flex>

        <Flex direction={"column"} gap={"4"} mb={"4"}>
          <CollapsedSidebar
            onClick={toggleSidebar}
            style={{ justifyContent: collapsed ? "center" : "flex-start" }}
          >
            <ArrowRightToLine
              style={{ display: collapsed ? "block" : "none" }}
              size={18}
            />
            <ArrowLeftToLine
              style={{ display: collapsed ? "none" : "block" }}
              size={18}
            />
            <ItemText
              size={"3"}
              style={{ display: collapsed ? "none" : "block" }}
              weight={"medium"}
            >
              Minimizar
            </ItemText>
          </CollapsedSidebar>
        </Flex>
      </Bar>
    </ContainerSidebar>
  );
}
