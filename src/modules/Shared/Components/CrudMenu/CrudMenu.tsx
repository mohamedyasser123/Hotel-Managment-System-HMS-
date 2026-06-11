import { Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

interface ActionsMenuProps {
  anchorEl: null | HTMLElement;
  open: boolean;
  onClose: () => void;
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function ActionsMenu({
  anchorEl,
  open,
  onClose,
  onView,
  onEdit,
  onDelete,
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
            minWidth: 125, // 👈
            p: 0.5,
            boxShadow: "none",
            border: "1px solid #E2E5EB",
          },
        },
      }}>
      {/* VIEW */}
      <MenuItem
        onClick={() => {
          onView?.();
          onClose();
        }}
        sx={menuStyle}>
        <ListItemIcon sx={{ minWidth: 28 }}>
          <VisibilityOutlinedIcon sx={{ fontSize: "18px" }} />
        </ListItemIcon>
        <ListItemText
          primary="View"
          slotProps={{
            primary: { sx: { fontSize: "13.5px", fontWeight: 500 } },
          }}
        />
      </MenuItem>

      {/* EDIT */}
      <MenuItem
        onClick={() => {
          onEdit?.();
          onClose();
        }}
        sx={menuStyle}>
        <ListItemIcon sx={{ minWidth: 28 }}>
          <EditOutlinedIcon sx={{ fontSize: "18px" }} />
        </ListItemIcon>
        <ListItemText
          primary="Edit"
          slotProps={{
            primary: { sx: { fontSize: "13.5px", fontWeight: 500 } },
          }}
        />
      </MenuItem>

      {/* DELETE */}
      <MenuItem
        onClick={() => {
          onDelete?.();
          onClose();
        }}
        sx={menuStyle}>
        <ListItemIcon sx={{ minWidth: 28 }}>
          <DeleteOutlineOutlinedIcon sx={{ fontSize: "18px" }} />
        </ListItemIcon>
        <ListItemText
          primary="Delete"
          slotProps={{
            primary: { sx: { fontSize: "13.5px", fontWeight: 500 } },
          }}
        />
      </MenuItem>
    </Menu>
  );
}

const menuStyle = {
  borderRadius: "6px",
  py: 0.8,
  px: 1.2,
  mb: 0.2,
  transition: "all 0.15s ease",
  color: "#4A5568",
  "& .MuiListItemIcon-root": {
    color: "#718096",
    transition: "color 0.15s ease",
  },
  "& .MuiTypography-root": {
    transition: "color 0.15s ease",
  },

  "&:hover": {
    backgroundColor: "#F0F3FF",
    "& .MuiListItemIcon-root": {
      color: "#3252DF",
    },
    "& .MuiTypography-root": {
      color: "#3252DF",
    },
  },
};
