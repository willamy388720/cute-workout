import { ToastProvider } from "@contexts/ToastContext";
import { AppRoute } from "@routes/app.routes";
import { GlobalStyle } from "@styles/global";
import { generateRadixColors } from "@utils/colors/generateRadixColors";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

function App() {
  const colorsRadix = generateRadixColors({ accent: "#1F3D7E" }).accentScale;

  return (
    <ThemeProvider theme={{}}>
      <ToastProvider>
        <BrowserRouter>
          <GlobalStyle colorsRadix={colorsRadix} />
          <AppRoute />
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
