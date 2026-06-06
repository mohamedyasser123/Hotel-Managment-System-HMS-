import { Box } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";

import loginImage from "../assets/images/auth1.png";
import registerImage from "../assets/images/auth2.png";
import forgotImage from "../assets/images/auth3.png";
import verifytImage from "../assets/images/auth3.png";
import resetPasstImage from "../assets/images/auth2.png";
import changePassImage from "../assets/images/auth1.png";
import LanguageToggle from "../modules/Shared/Components/LangToggleBtn/LangToggleBtn";

export default function AuthLayout() {
  const location = useLocation();

  const images: Record<string, string> = {
    "/login": loginImage,
    "/register": registerImage,
    "/forget-password": forgotImage,
    "/verify-account": verifytImage,
    "/reset-password": resetPasstImage,
    "/change-password": changePassImage,
  };

  const image = images[location.pathname];

  return (
<Box
  sx={{
    height: "100vh",
    display: "flex",
    overflow: "hidden",
    position: "relative",
    flexDirection: "column",
  }}
>
  
  <Box
    sx={{
      display: "flex",
      flexDirection: "row",
      flex: 1,
      height: "100%",
    }}
  >
    <Box
      sx={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative", 
      }}
    >
      
      <Box
        sx={{
          position: "absolute",
          top: 40,
          left: 50,
          right: 50,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 10,
        }}
      >
        {/* LOGO */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            fontWeight: "bold",
            fontSize: "20px",
          }}
        >
          <Box component="span" sx={{ color: "#3252DF" }}>
            Stay
            <Box component="span" sx={{ color: "#152C5B" }}>
              cation
            </Box>
          </Box>
        </Box>

        <LanguageToggle />
      </Box>

      
      <Box sx={{ width: "100%", maxWidth: 420 }}>
        <Outlet />
      </Box>
    </Box>

    
    <Box
      sx={{
        flex: 1,
        display: { xs: "none", md: "block" },
      }}
    >
      <img
        src={image}
        alt="auth"
        style={{
          width: "100%",
          height: "100vh",
          objectFit: "fill",
          display: "block",
          borderRadius: "20px",
          padding: "10px",
        }}
      />
    </Box>
  </Box>
</Box>
  );
}
