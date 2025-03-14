import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@contexts/SidebarContext";
import { LayoutContainer } from "./styles";
import { Header } from "@components/shared/Header";
import { ContentPage } from "@components/shared/ContentPage";

export function WorkoutLayout() {
  return (
    <SidebarProvider>
      <LayoutContainer direction={"column"} align={"center"}>
        <Header />
        <ContentPage isSidebar={false}>
          <Outlet />
        </ContentPage>
      </LayoutContainer>
    </SidebarProvider>
  );
}
