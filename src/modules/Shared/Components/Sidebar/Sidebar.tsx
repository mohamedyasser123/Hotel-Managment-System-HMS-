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

import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";

import { useNavigate } from "react-router-dom";

const DRAWER_WIDTH = 240;
const MINI_WIDTH = 70;

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "Dashboard",
      icon: <DashboardIcon />,
      path: "/dashboard",
    },
    {
      title: "Users",
      icon: <PeopleIcon />,
      path: "/users",
    },
    {
      title: "Products",
      icon: <InventoryIcon />,
      path: "/products",
    },
    {
      title: "Orders",
      icon: <ShoppingCartIcon />,
      path: "/orders",
    },
    {
      title: "Reports",
      icon: <BarChartIcon />,
      path: "/reports",
    },
    {
      title: "Settings",
      icon: <SettingsIcon />,
      path: "/settings",
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
          backgroundColor: "#1F263E",
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

                "&:hover": {
                  backgroundColor: "#2B3555",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                  color: "#fff",
                }}
              >
                {item.icon}
              </ListItemIcon>

              <ListItemText
                primary={item.title}
                sx={{
                  opacity: open ? 1 : 0,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}