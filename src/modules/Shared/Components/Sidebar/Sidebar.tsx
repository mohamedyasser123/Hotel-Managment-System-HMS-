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
  Box,
} from "@mui/material";
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom'; 
import CampaignIcon from '@mui/icons-material/Campaign'; 
import BookOnlineIcon from '@mui/icons-material/BookOnline'; 
import CorporateFareIcon from '@mui/icons-material/CorporateFare'; 
import LockResetIcon from '@mui/icons-material/LockReset';
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";

import { useLocation, useNavigate } from "react-router-dom";

const DRAWER_WIDTH = 240;
const MINI_WIDTH = 70;

export default function Sidebar() {
  const location = useLocation();
const currentPath = location.pathname;
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "Dashboard",
      icon: <DashboardIcon />,
      path: "/admin/dashboard",
    },
    {
      title: "Users",
      icon: <PeopleIcon />,
      path: "/admin/user-list",
    },
   {
    title: "Rooms",
    icon: <MeetingRoomIcon />,
    path: "/admin/room-list",
  },
  {
    title: "ADS",
    icon: <CampaignIcon />,
    path: "/admin/ads-list",
  },
  {
    title: "Booking",
    icon: <BookOnlineIcon />,
    path: "/admin/booking-list",
  },
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
    {
      title: "LogOut",
      icon: <LockResetIcon />,
      path: "/admin/settings",
    },
  ];

  return (
    <Drawer
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
        },
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: open ? "flex-end" : "center",
          px: 1,
        }}
      >
        <IconButton
          onClick={() => setOpen(!open)}
          sx={{ color: "#fff" }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      <List>
        {menuItems.map((item) => (
         <ListItem
  key={item.title}
  disablePadding
  sx={{ display: "block" }}
>
  <ListItemButton
    onClick={() => navigate(item.path)}
    sx={{
      minHeight: 56,
      justifyContent: open ? "initial" : "center",
      px: 2.5,
      backgroundColor: currentPath === item.path ? "#1A1B1E2B" : "transparent",
      "&:hover": {
        backgroundColor: "#1A1B1E2B",
      },
    }}
  >
    <ListItemIcon
      sx={{
        minWidth: 0,
        mr: open ? 3 : "auto",
        justifyContent: "center",
        color: currentPath === item.path ? "#fff" : "#FAFAFA",
      }}
    >
      {item.icon}
    </ListItemIcon>

    <ListItemText
      primary={item.title}
      sx={{
        opacity: open ? 1 : 0,
      }}
    slotProps={{
    primary: {
      sx: {
        color: currentPath === item.path ? "#fff" : "#FAFAFA",
        fontWeight: currentPath === item.path ? "bold" : "normal",
      }
    }
  }}
    />
  </ListItemButton>
</ListItem>
        ))}
      </List>
    </Drawer>
  );
}