import { Switch, Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function LanguageToggle() {
  const { i18n } = useTranslation();

  const isArabic = i18n.language === "ar";

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";

    i18n.changeLanguage(newLang);

    localStorage.setItem("lang", newLang);

    document.documentElement.dir =
  newLang === "ar" ? "rtl" : "ltr";

document.documentElement.lang =
  newLang;
  };

  return (
    <Box 
      sx={{ 
        display: "flex", 
        alignItems: "center", 
        gap: 1,
        flexDirection: "row", 
        userSelect: "none"
      }}
    >
      <Typography 
        sx={{ 
          fontSize: 13, 
          fontWeight: !isArabic ? 700 : 500, 
          color: "#152C5B",
          opacity: !isArabic ? 1 : 0.5, 
          transition: "all 0.3s ease"
        }}
      >
        EN
      </Typography>

      <Switch
        checked={isArabic}
        onChange={toggleLanguage}
        sx={{
          width: 50,
          height: 26,
          padding: 0,
          display: "flex",
          "& .MuiSwitch-switchBase": {
            padding: "3px",
            transitionDuration: "300ms",
            "&.Mui-checked": {
              transform: "translateX(24px)",
              color: "#fff",
              "& + .MuiSwitch-track": {
                backgroundColor: "#3252DF",
                opacity: 1,
                border: 0,
              },
            },
          },
          "& .MuiSwitch-thumb": {
            boxShadow: "0 2px 4px 0 rgba(0,35,11,0.2)",
            width: 20,
            height: 20,
            borderRadius: 10,
          },
          "& .MuiSwitch-track": {
            borderRadius: 13,
            backgroundColor: "#D3D6DC",
            opacity: 1,
            transition: "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1)",
          },
        }}
      />

      <Typography 
        sx={{ 
          fontSize: 13, 
          fontWeight: isArabic ? 700 : 500,
          color: "#152C5B",
          opacity: isArabic ? 1 : 0.5,
          transition: "all 0.3s ease"
        }}
      >
        AR
      </Typography>
    </Box>
  );
}