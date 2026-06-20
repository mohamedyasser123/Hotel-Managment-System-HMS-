import { Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";



interface ActionItem {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  danger?: boolean;
}

interface ActionsMenuProps {
  anchorEl: null | HTMLElement;
  open: boolean;
  onClose: () => void;
  actions: ActionItem[];
}

export default function ActionsMenu({
  anchorEl,
  open,
  onClose,
  actions,
}: ActionsMenuProps) {
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      slotProps={{
        paper: {
          sx: {
            borderRadius: "8px",
            minWidth: 125,
            p: 0.5,
            boxShadow: "none",
            border: "1px solid #E2E5EB",
          },
        },
      }}>
      {actions.map((action, index) => (
        <MenuItem
          key={index}
          onClick={() => {
            action.onClick?.();
            onClose();
          }}
          sx={{
            borderRadius: "6px",
            py: 0.8,
            px: 1.2,
            mb: index === actions.length - 1 ? 0 : 0.2,
            transition: "all 0.15s ease",

            color: "#203FC7",

            "& .MuiListItemIcon-root": {
              minWidth: 28,
              
              color: "#203FC7",
              transition: "color 0.15s ease",
              "& svg": {
                fontSize: "18px",
              },
            },

            "& .MuiTypography-root": {
              fontSize: "13.5px",
              fontWeight: 500,
              transition: "color 0.15s ease",
            },

            "&:hover": {
              backgroundColor: "#E2E5EB",

              "& .MuiTypography-root, & .MuiListItemIcon-root": {
                color: "#203FC7",
              },
            },
          }}>
          <ListItemIcon>{action.icon}</ListItemIcon>
          <ListItemText primary={action.label} />
        </MenuItem>
      ))}
    </Menu>
  );
}
