import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import { useEffect, useState } from "react";
import LanguageToggle from "../LangToggleBtn/LangToggleBtn";
import NotificationsIcon from "@mui/icons-material/Notifications";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useTranslation } from "react-i18next";
import MenuIcon from "@mui/icons-material/Menu";

import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { toast } from "react-toastify";
import DeleteConfirmation from "../DeleteConfirmation/DeleteConfirmation";

export default function Navbar() {
  const { data, fetchProfile, } = useAuth();
  const { t, i18n } = useTranslation("user");
const isRTL = i18n.language === "ar";
  const user = data?.user;
  const role = user?.role;
const navigate=useNavigate();

useEffect(() => {
  const token = localStorage.getItem("token");

  if (token && !data) {
    fetchProfile();
  }
}, [data, fetchProfile]);
const [openDrawer, setOpenDrawer] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);

const handleLogoutConfirm = () => {
  localStorage.clear();

  setOpenLogout(false);

  toast.success("Logout success");

  navigate("/login");
};

const [notifications, setNotifications] =
  useState<any[]>([]);

const [anchorEl, setAnchorEl] =
  useState<null | HTMLElement>(null);

const openNotifications = Boolean(anchorEl);

const handleOpenNotifications = (
  event: React.MouseEvent<HTMLElement>
) => {
  setAnchorEl(event.currentTarget);

  const updatedNotifications =
    notifications.map((item) => ({
      ...item,
      read: true,
    }));

  setNotifications(updatedNotifications);

  localStorage.setItem(
    "notifications",
    JSON.stringify(updatedNotifications)
  );
};

const handleCloseNotifications = () => {
  setAnchorEl(null);
};

const loadNotifications = () => {
  const storedNotifications = JSON.parse(
    localStorage.getItem("notifications") || "[]"
  );

  setNotifications(storedNotifications);
};

useEffect(() => {
  loadNotifications();

  window.addEventListener(
    "notification-added",
    loadNotifications
  );

  return () => {
    window.removeEventListener(
      "notification-added",
      loadNotifications
    );
  };
}, []);

const unreadCount = notifications.filter(
  (item) => !item.read
).length;
  return (
    <>
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
            width: { xs: "92%", md: "85%" },
            maxWidth: "1750px", 
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 2,
            direction: isRTL ? "rtl" : "ltr",
          }}>
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
 <Box
  sx={{
    display: {
      xs: "block",
      md: "none",
    },
  }}
>
  <IconButton
    onClick={() => setOpenDrawer(true)}
  >
    <MenuIcon />
  </IconButton>
</Box>
          <Box
            sx={{
                 display: {
      xs: "none",
      md: "flex",
    },

    alignItems: "center",
    gap: 2,
  
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
              {t("navbar.home")}
            </Button>
            <Button component={NavLink} to="/explore">
              {t("navbar.explore")}
            </Button>

            {role === "user" ? (
              <>
                <Button
                  onClick={() => {
                    navigate("/");

                    setTimeout(() => {
                      document
                        .getElementById("reviews")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                  }}>
                  {t("navbar.review")}
                </Button>
                <Button component={NavLink} to="/favorites">
                  {t("navbar.favorites")}
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

              <IconButton
  sx={{ color: "#1F384C" }}
  onClick={handleOpenNotifications}
>
  <Badge
    badgeContent={unreadCount}
    color="error"
  >
    <NotificationsIcon />
  </Badge>
</IconButton>
                <Button
  onClick={() => setOpenLogout(true)}
  sx={{
    color: "#d32f2f !important",
    fontWeight: 600,
  }}
>
    {t("navbar.logout")}

</Button>
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
                    color: "#fff !important",
                    px: 3,
                    borderRadius: 2,
                    "&:hover": { backgroundColor: "#2441c7" },
                  }}>
                  {t("navbar.login")}
                </Button>

                <Button
                  component={NavLink}
                  to="/register"
                  variant="contained"
                  sx={{
                    bgcolor: "#3252DF",
                    color: "#fff !important",

                    textTransform: "none",
                    px: 3,
                    borderRadius: 2,
                    "&:hover": { backgroundColor: "#2441c7" },
                  }}>
                  {t("navbar.register")}
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Toolbar>
      <Drawer
  anchor={isRTL ? "right" : "left"}
  open={openDrawer}
  onClose={() => setOpenDrawer(false)}
>
  <Box
    sx={{
      width: 280,
      p: 2,
    }}
  >
    <List>

      <ListItemButton
        component={NavLink}
        to="/home"
      >
        <ListItemText
          primary={t("navbar.home")}
        />
      </ListItemButton>

      <ListItemButton
        component={NavLink}
        to="/explore"
      >
        <ListItemText
          primary={t("navbar.explore")}
        />
      </ListItemButton>

      <ListItemButton
        onClick={() => {
          navigate("/");

          setTimeout(() => {
            document
              .getElementById("reviews")
              ?.scrollIntoView({
                behavior: "smooth",
              });
          }, 100);

          setOpenDrawer(false);
        }}
      >
        <ListItemText
          primary={t("navbar.review")}
        />
      </ListItemButton>

      {role === "user" && (
        <ListItemButton
          component={NavLink}
          to="/favorites"
        >
          <ListItemText
            primary={t("navbar.favorites")}
          />
        </ListItemButton>
      )}

      <Box sx={{ px: 2, py: 1 }}>
        <LanguageToggle />
      </Box>

      {role === "user" && (
        <ListItemButton
  onClick={() => setOpenLogout(true)}
>
  <ListItemText primary="Logout" />
</ListItemButton>
      )}
    </List>
  </Box>
</Drawer>
<DeleteConfirmation
  open={openLogout}
  onClose={() => setOpenLogout(false)}
  onConfirm={handleLogoutConfirm}
  itemName="Session"
  title={t("navbar.logout")}
  description={t("navbar.logoutDescription")}
  confirmText={t("navbar.logout")}
/>



    </AppBar>
    <Menu
  anchorEl={anchorEl}
  open={openNotifications}
  onClose={handleCloseNotifications}
   slotProps={{
    paper: {
      sx: {
        width: 350,
        maxHeight: 400,
        overflowY: "auto",
      },
    },
  }}
>
  <Box sx={{ px: 2, py: 1 }}>
    <Typography
      variant="h6"
      sx={{fontWeight:600}}
      
    >
      Notifications
    </Typography>
  </Box>

  <Divider />

  {notifications.length === 0 ? (
    <MenuItem disabled>
      No Notifications
    </MenuItem>
  ) : (
    notifications.map((item) => (
      <MenuItem
        key={item.id}
        sx={{
          whiteSpace: "normal",
          alignItems: "flex-start",
          py: 1.5,
        }}
      >
        <Box>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            {item.title}
          </Typography>

          <Typography
            sx={{
              fontSize: 13,
              color: "text.secondary",
            }}
          >
            {item.message}
          </Typography>
        </Box>
      </MenuItem>
    ))
  )}
</Menu>
    </>
    
  );
}
