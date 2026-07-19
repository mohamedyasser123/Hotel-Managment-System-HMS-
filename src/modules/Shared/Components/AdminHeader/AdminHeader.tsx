import { Avatar, Badge, Box, IconButton, Typography } from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import useAuth from '../../../../hooks/useAuth';
import { useEffect } from 'react';
import LanguageToggle from '../LangToggleBtn/LangToggleBtn';
import { useTranslation } from "react-i18next";
export default function AdminHeader() {
  const { data, fetchProfile } = useAuth();
  const user = data?.user;
const { t } = useTranslation("user");
  useEffect(() => {
    if (!data) {
      fetchProfile();
    }
  }, [data, fetchProfile]);

  return (
<Box
  sx={{
    background: "#F8F9FB",
    color: "#F8F9FB",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    px: { xs: 2, sm: 3 },
    py: { xs: 1.5, sm: 2 }, 
    height: "100%",
  }}
>
  <Typography variant="h6" sx={{ color: "#1A1B1E", fontWeight: "bold" }}>
  </Typography>

  <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 2, sm: 3 } }}>
    {user ? (
      <Box
       
        sx={{
          display: "flex",
          alignItems: "center",
          gap: { xs: 1.5, sm: 2 }, 
          cursor: "pointer",
          "&:hover": { opacity: 0.8 }
        }}
      >
        <LanguageToggle />

        <Avatar
          src={user.profileImage}
          alt={user.userName}
          sx={{ width: { xs: 32, sm: 36 }, height: { xs: 32, sm: 36 } }} 
        />

        <Typography
          variant="body1"
          sx={{
            fontWeight: 500,
            color: "#1A1B1E",
            display: { xs: "none", sm: "block" } 
          }}
        >
          {user.userName}
        </Typography>

        <KeyboardArrowDownIcon 
          sx={{ 
            color: "#777", 
            fontSize: 20,
            display: { xs: "none", sm: "block" }
          }} 
        />
      </Box>
    ) : (
      <Typography variant="body2" color="text.secondary">
  {t("adminHeader.loading")}
</Typography>
    )}

    <IconButton sx={{ color: "#1F384C", p: { xs: 0.5, sm: 1 } }}>
      <Badge badgeContent={4} color="error">
        <NotificationsIcon sx={{ fontSize: { xs: 22, sm: 24 } }} />
      </Badge>
    </IconButton>
  </Box>
</Box>
  );
}