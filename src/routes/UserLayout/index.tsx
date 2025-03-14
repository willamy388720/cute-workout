import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@contexts/SidebarContext";
import { LayoutContainer } from "./styles";
import { Sidebar } from "@components/shared/Sidebar";
import { Header } from "@components/shared/Header";
import { ContentPage } from "@components/shared/ContentPage";

export function UserLayout() {
  return (
    <SidebarProvider>
      <LayoutContainer direction={"column"} align={"center"}>
        <Sidebar />
        <Header />
        <ContentPage>
          <Outlet />
        </ContentPage>
      </LayoutContainer>
    </SidebarProvider>
  );
}
