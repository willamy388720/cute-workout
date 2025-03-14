import { useSidebar } from "@hooks/useSidebar";
import { ReactNode } from "react";
import { Content } from "./styles";

type ContentPageProps = {
  children: ReactNode;
  isSidebar?: boolean;
};
export function ContentPage({ children, isSidebar = true }: ContentPageProps) {
  const { collapsed } = useSidebar();

  return (
    <Content
      direction={"column"}
      mt={"5"}
      sidebarCollapsed={collapsed}
      isSidebar={isSidebar}
    >
      {children}
    </Content>
  );
}
