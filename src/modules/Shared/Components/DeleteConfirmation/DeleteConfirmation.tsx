import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  Box,
} from "@mui/material";
import deleteImg from "../../../../assets/images/delete.png";
interface DeleteConfirmationProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
  image?: string;
  title?: string;        
  description?: string;  
  confirmText?: string;
}

export default function DeleteConfirmation({
  open,
  onClose,
  onConfirm,
  itemName,
  image,
  title,
  description,
  confirmText = "Delete",
}: DeleteConfirmationProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: "20px",
            p: 2,
          },
        },
      }}>
      <DialogContent
        sx={{
          textAlign: "center",
          pt: 3,
        }}>
        {/* IMAGE */}
        <Box
          component="img"
          src={image || deleteImg}
          alt="delete"
          sx={{
            width: 120,
            mx: "auto",
            mb: 3,
          }}
        />

        {/* TITLE */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: "#1F263E",
            mb: 1,
          }}>
         {title || `Delete This ${itemName} ?`}
        </Typography>

        {/* DESCRIPTION */}
        <Typography
          sx={{
            color: "#7E8299",
            fontSize: "14px",
            lineHeight: 1.8,
            maxWidth: "320px",
            mx: "auto",
          }}>
          {description || `Are you sure you want to delete this item ? If you are sure just click on delete it.`}
        </Typography>
      </DialogContent>

      <DialogActions
        sx={{
          px: 3,
          pb: 3,
          gap: 1,
        }}>
        <Button
          fullWidth
          onClick={onClose}
          sx={{
            backgroundColor: "#F5F5F5",
            color: "#1F263E",
            borderRadius: "10px",
            textTransform: "none",
            py: 1.2,
            fontWeight: 600,
          }}>
          Cancel
        </Button>

        <Button
          fullWidth
          variant="contained"
          onClick={onConfirm}
          sx={{
            backgroundColor: "#D92D20",
            borderRadius: "10px",
            textTransform: "none",
            py: 1.2,
            fontWeight: 600,
            boxShadow: "none",

            "&:hover": {
              backgroundColor: "#B42318",
              boxShadow: "none",
            },
          }}>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
