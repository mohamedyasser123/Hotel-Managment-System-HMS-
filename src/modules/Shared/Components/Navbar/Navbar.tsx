import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import { useEffect } from "react";
import LanguageToggle from "../LangToggleBtn/LangToggleBtn";
import NotificationsIcon from "@mui/icons-material/Notifications";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function Navbar() {
  const { data, fetchProfile } = useAuth();
  const user = data?.user;
  const role = user?.role;

  useEffect(() => {
    if (!data) fetchProfile();
  }, [data, fetchProfile]);

  return (
    <AppBar
      position="static"
      color="inherit"
      elevation={0}
      sx={{
        width: "100%",
        borderBottom: "1px solid #E5E5E5",
      }}>
      <Toolbar sx={{ px: 0 }}>
        <Box
          sx={{
            width: "80%",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 2,
          }}>
          {/* LOGO */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              flexShrink: 0,
            }}>
            <Box component="span" sx={{ color: "#3252DF" }}>
              Stay
            </Box>

            <Box component="span" sx={{ color: "#152C5B" }}>
              cation.
            </Box>
          </Typography>

          {/* LINKS */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 1, md: 2 },
              flexWrap: "wrap",
              "& .active": {
                color: "#3252DF !important",
                fontWeight: 600,
              },
              "& .MuiButton-root": {
                color: "#152C5B",
                textTransform: "none",
                fontWeight: 500,
              },
            }}>
            <Button component={NavLink} to="/home" end>
              Home
            </Button>
            <Button component={NavLink} to="/explore">
              Explore
            </Button>

            {role === "user" ? (
              <>
                <Button>Review</Button>
                <Button component={NavLink} to="/favorites">
                  Favorites
                </Button>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    cursor: "pointer",
                    "&:hover": { opacity: 0.8 },
                  }}>
                  <LanguageToggle />

                  <Avatar
                    src={user?.profileImage}
                    alt={user?.userName}
                    sx={{ width: 36, height: 36 }}
                  />

                  <Typography sx={{ fontWeight: 500, color: "#1A1B1E" }}>
                    {user?.userName}
                  </Typography>

                  <KeyboardArrowDownIcon />
                </Box>

                <IconButton sx={{ color: "#1F384C" }}>
                  <Badge badgeContent={4} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </>
            ) : (
              <>
                <Button
                  component={NavLink}
                  to="/login"
                  variant="contained"
                  sx={{
                    bgcolor: "#3252DF",
                    textTransform: "none",
                    px: 3,
                    borderRadius: 2,
                    "&:hover": { backgroundColor: "#2441c7" },
                  }}>
                  Login
                </Button>

                <Button
                  component={NavLink}
                  to="/register"
                  variant="contained"
                  sx={{
                    bgcolor: "#3252DF",
                    textTransform: "none",
                    px: 3,
                    borderRadius: 2,
                    "&:hover": { backgroundColor: "#2441c7" },
                  }}>
                  Register
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
