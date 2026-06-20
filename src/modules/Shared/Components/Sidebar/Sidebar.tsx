import { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Toolbar,
  useTheme,
  useMediaQuery,
  Box,
} from "@mui/material";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import CampaignIcon from "@mui/icons-material/Campaign";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import LockResetIcon from "@mui/icons-material/LockReset";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import LogoutIcon from "@mui/icons-material/Logout";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DeleteConfirmation from "../DeleteConfirmation/DeleteConfirmation";
import { toast } from "react-toastify";

const DRAWER_WIDTH = 240;
const MINI_WIDTH = 70;

export default function Sidebar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const theme = useTheme();
  
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [openLogout, setOpenLogout] = useState(false);
  const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogoutConfirm = () => {
    localStorage.removeItem("token");
    localStorage.clear();
    console.log("Logged out successfully and token cleared!");
    setOpenLogout(false);
    toast.success("logOut success");
    navigate("/login");
  };

  const handleItemClick = (item: any) => {
    if (item.action === "logout") {
      setOpenLogout(true);
    } else if (item.path) {
      navigate(item.path);
      if (isMobile) {
        setMobileOpen(false);
      }
    }
  };

  const menuItems = [
    { title: "Dashboard", icon: <DashboardIcon />, path: "/admin/dashboard" },
    { title: "Users", icon: <PeopleIcon />, path: "/admin/user-list" },
    { title: "Rooms", icon: <MeetingRoomIcon />, path: "/admin/room-list" },
    { title: "ADS", icon: <CampaignIcon />, path: "/admin/ads-list" },
    { title: "Booking", icon: <BookOnlineIcon />, path: "/admin/booking-list" },
    {
      title: "Facilities",
      icon: <CorporateFareIcon />,
      path: "/admin/facilities-list",
    },
    {
      title: "Change Password",
      icon: <LockResetIcon />,
      path: "/change-password",
    },
    { title: "LogOut", icon: <LogoutIcon />, path: "#", action: "logout" },
  ];

  const drawerContent = (
    <>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: isMobile ? "flex-end" : open ? "flex-end" : "center",
          px: 1,
        }}
      >
        <IconButton 
          onClick={() => isMobile ? setMobileOpen(false) : setOpen(!open)} 
          sx={{ color: "#fff" }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      <List>
        {menuItems.map((item) => (
          <ListItem key={item.title} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={() => handleItemClick(item)}
              sx={{
                minHeight: 56,
                justifyContent: isMobile ? "initial" : open ? "initial" : "center",
                px: 2.5,
                backgroundColor:
                  currentPath === item.path ? "#1A1B1E2B" : "transparent",
                "&:hover": {
                  backgroundColor: "#1A1B1E2B",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: isMobile ? 3 : open ? 3 : "auto",
                  justifyContent: "center",
                  color: currentPath === item.path ? "#fff" : "#FAFAFA",
                }}
              >
                {item.icon}
              </ListItemIcon>

              <ListItemText
                primary={item.title}
                sx={{
                  opacity: isMobile ? 1 : open ? 1 : 0,
                  display: isMobile ? "block" : open ? "block" : "none",
                }}
                slotProps={{
                  primary: {
                    sx: {
                      color: currentPath === item.path ? "#fff" : "#FAFAFA",
                      fontWeight: currentPath === item.path ? "bold" : "normal",
                    },
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );

  const isRTL = i18n.language === "ar";

  return (
    <>
      {isMobile && (
        <IconButton
          onClick={() => setMobileOpen(true)}
          sx={{
            position: "fixed",
            top: 16,
            left: isRTL ? "auto" : 16,
            right: isRTL ? 16 : "auto",
            zIndex: 2000,
            bgcolor: "#203FC7",
            color: "#fff",
            "&:hover": {
              bgcolor: "#1A339E",
            },
          }}
        >
          <MenuIcon />
        </IconButton>
      )}

      <Box>
        {isMobile ? (
          <Drawer
            anchor={isRTL ? "right" : "left"}
            variant="temporary"
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            ModalProps={{ keepMounted: true }}
            sx={{
              "& .MuiDrawer-paper": {
                width: DRAWER_WIDTH,
                backgroundColor: "#203FC7",
                color: "#fff",
                borderRight: "none",
                borderLeft: "none",
              },
            }}
          >
            {drawerContent}
          </Drawer>
        ) : (
          <Drawer
            anchor={isRTL ? "right" : "left"}
            variant="permanent"
            sx={{
              width: open ? DRAWER_WIDTH : MINI_WIDTH,
              flexShrink: 0,
              whiteSpace: "nowrap",
              "& .MuiDrawer-paper": {
                width: open ? DRAWER_WIDTH : MINI_WIDTH,
                transition: "all 0.3s ease",
                overflowX: "hidden",
                backgroundColor: "#203FC7",
                color: "#fff",
                borderRight: "none",
                borderLeft: "none",
              },
            }}
          >
            {drawerContent}
          </Drawer>
        )}

        <DeleteConfirmation
          open={openLogout}
          onClose={() => setOpenLogout(false)}
          onConfirm={handleLogoutConfirm}
          itemName="Session"
          title="Log Out ?"
          description="Are you sure you want to log out of your account?"
          confirmText="Log Out"
        />
      </Box>
    </>
  );
}