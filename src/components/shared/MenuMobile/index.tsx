import { ChartSpline, Dumbbell, Goal, Settings, User } from "lucide-react";
import { Item } from "../Sidebar";
import { ContainerMenuMobile, ItemText, MenuItem } from "./styles";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Flex } from "@radix-ui/themes";

type MenuMobileProps = {
  saveIsOpenMenuMobile: (value: boolean) => void;
};

export function MenuMobile({ saveIsOpenMenuMobile }: MenuMobileProps) {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);

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
    </ContainerMenuMobile>
  );
}
