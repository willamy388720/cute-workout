import { ArrowLeftToLine, ArrowRightToLine } from "lucide-react";

import {
  Bar,
  CollapsedSidebar,
  ContainerSidebar,
  ItemText,
  MenuItem,
} from "./styles";

import { Flex } from "@styles/layout";

type Item = {
  name: string;
  value: string;
};

type SidebarProps = {
  collapsed: boolean;
  toggleSidebar: () => void;
  activeItem: string;
  onChangeActiveItem: (value: string) => void;
};

export function Sidebar({
  collapsed,
  toggleSidebar,
  activeItem,
  onChangeActiveItem,
}: SidebarProps) {
  const itemsUser: Item[] = [
    {
      name: "Pescoço",
      value: "neck",
    },
    {
      name: "Trapézio",
      value: "trapezius",
    },
    {
      name: "Ombro",
      value: "shoulders",
    },
    {
      name: "Peito",
      value: "chest",
    },
    {
      name: "Costas",
      value: "back",
    },
    {
      name: "Coluna",
      value: "erector spinae",
    },
    {
      name: "Bíceps",
      value: "biceps",
    },
    {
      name: "Tríceps",
      value: "triceps",
    },
    {
      name: "Antebraço",
      value: "forearm",
    },
    {
      name: "Abdômen",
      value: "abs",
    },
    {
      name: "Perna",
      value: "leg",
    },
    {
      name: "Panturrilha",
      value: "calf",
    },
    {
      name: "Quadris",
      value: "hip",
    },
    {
      name: "Cardio",
      value: "cardio",
    },
    {
      name: "Corpo inteiro",
      value: "full body",
    },
  ];

  return (
    <ContainerSidebar>
      <Bar justify={"space-between"} collapsed={collapsed}>
        <Flex direction={"column"} gap={1}>
          {itemsUser.map((item, index) => (
            <MenuItem
              key={index}
              active={item.value === activeItem}
              onClick={() => onChangeActiveItem(item.value)}
              collapsed={collapsed}
            >
              <Flex gap={2} align={"center"} direction="row">
                <ItemText
                  size={"2"}
                  style={{ display: collapsed ? "none" : "block" }}
                  weight={"regular"}
                >
                  {item.name}
                </ItemText>
              </Flex>
            </MenuItem>
          ))}
        </Flex>

        <Flex direction={"column"} gap={4}>
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
              weight={"regular"}
            >
              Minimizar
            </ItemText>
          </CollapsedSidebar>
        </Flex>
      </Bar>
    </ContainerSidebar>
  );
}
