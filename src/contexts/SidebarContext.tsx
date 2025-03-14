import { createContext, ReactNode, useState } from "react";

type SidebarContextType = {
  collapsed: boolean;
  toggleSidebar: () => void;
};

export const SidebarContext = createContext({} as SidebarContextType);

type SidebarProviderProps = {
  children: ReactNode;
};

export function SidebarProvider({ children }: SidebarProviderProps) {
  const [collapsed, setCollapsed] = useState(false);

  function toggleSidebar() {
    setCollapsed((prevState) => !prevState);
  }

  return (
    <SidebarContext.Provider value={{ collapsed, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}
