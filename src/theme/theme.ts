import { createTheme } from "@mui/material/styles";

export const getTheme = (lang: string) =>
  createTheme({
    direction: lang === "ar" ? "rtl" : "ltr",
  });