
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import "./index.css";
import "./i18n";

import { ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

import { useTranslation } from "react-i18next";
import { getTheme } from "./theme/theme";
import AuthContextProvider from "./context/AuthContext.tsx";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";


const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [],
});

function Root() {
  const { i18n } = useTranslation();

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={getTheme(i18n.language)}>
        <AuthContextProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <App />
          </LocalizationProvider>
        </AuthContextProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
