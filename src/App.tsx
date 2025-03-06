import "@radix-ui/themes/styles.css";
import "./themes/theme-config.css";

import * as Toast from "@radix-ui/react-toast";
import { AppRoute } from "@routes/app.routes";
import { GlobalStyle } from "@styles/global";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Theme } from "@radix-ui/themes";
import { ToastCustomProvider } from "@contexts/ToastContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@libs/react-query";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={{}}>
        <Theme
          accentColor="blue"
          grayColor="gray"
          radius="small"
          hasBackground={false}
          panelBackground="solid"
        >
          <Toast.Provider>
            <BrowserRouter>
              <GlobalStyle />

              <ToastCustomProvider>
                <AppRoute />
              </ToastCustomProvider>
            </BrowserRouter>
          </Toast.Provider>
        </Theme>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
