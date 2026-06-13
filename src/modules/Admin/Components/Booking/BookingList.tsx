import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton,
  Chip,
  Box,
  Avatar,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import SharedTable from "../../../Shared/Components/CustomTable/CustomTable";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { useMemo, useState } from "react";
import { useBooking } from "../../../../hooks/useBooking";
import CrudHeader from "../../../Shared/Components/CrudHeader/CrudHeader";
import ActionsMenu from "../../../Shared/Components/CrudMenu/CrudMenu";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

export default function BookingList() {
  const { data,loading } = useBooking();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [openViewModal, setOpenViewModal] = useState(false);

  const handleOpen = (event: React.MouseEvent<HTMLElement>, rowId: string) => {
    setAnchorEl(event.currentTarget);

    setSelectedRowId(rowId);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const rows = useMemo(() => {
    return (data ?? []).map((booking) => ({
      id: booking._id,

      _id: booking._id,

      roomNumber: booking.room?.roomNumber || "No Room",

      totalPrice: booking.totalPrice,

      startDate: new Date(booking.startDate).toLocaleDateString("en-GB"),

      endDate: new Date(booking.endDate).toLocaleDateString("en-GB"),

      user: booking.user?.userName || "Unknown User",
      status: booking.status,
    }));
  }, [data]);

  const columns = [
    { field: "roomNumber", headerName: "roomNumber", flex: 1 },

    {
      field: "totalPrice",
      headerName: "Price",
      flex: 1,
    },

    {
      field: "startDate",
      headerName: "Start Date",
      flex: 1,
    },

    { field: "endDate", headerName: "End Date", flex: 1 },

    {
      field: "user",
      headerName: " User",
      flex: 1,
    },

    {
      field: "status",
      headerName: " Status",
      flex: 1,
    },
  ];

  return (
    <>
      <CrudHeader
        title="Booking Table Details"
        subtitle="You can check all details"
      />
      <SharedTable
        rows={rows}
        columns={columns}
        loading={loading}
        renderActions={(row) => (
          <>
            <IconButton onClick={(event) => handleOpen(event, row.id)}>
              <MoreHorizOutlinedIcon />
            </IconButton>
            <ActionsMenu
              anchorEl={anchorEl}
              open={Boolean(anchorEl) && selectedRowId === row.id}
              onClose={handleClose}
              actions={[
                {
                  label: "View",
                  icon: <VisibilityOutlinedIcon fontSize="small" />,

                  onClick: () => {
                    setSelectedBooking(row);

                    setOpenViewModal(true);

                    handleClose();
                  },
                },
              ]}
            />
          </>
        )}
      />
 <Dialog
  open={openViewModal}
  onClose={() => setOpenViewModal(false)}
  fullWidth
  maxWidth="sm"
  slotProps={{
    paper: {
      sx: {
        borderRadius: "16px",
        p: 1,
      },
    },
  }}
>
  <DialogTitle
    sx={{
      fontWeight: 600,
      color: "#1F263E",
      fontSize: "18px",
      pb: 2,
      borderBottom: "1px solid #E2E5EB", 
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }}
  >
    Booking Details
    
    <Chip
      label={selectedBooking?.status || "Pending"}
      color={
        selectedBooking?.status === "Completed" || selectedBooking?.status === "Confirmed"
          ? "success"
          : selectedBooking?.status === "Cancelled"
          ? "error"
          : "warning"
      }
      size="small"
      sx={{ fontWeight: 600, borderRadius: "6px" }}
    />
  </DialogTitle>

  <DialogContent sx={{ mt: 3, pb: 2 }}>
    
    <Box
      sx={{ 
        display: "flex", 
        alignItems: "center", 
        gap: 2, 
        mb: 4, 
        backgroundColor: "#F8F9FB", 
        p: 2, 
        borderRadius: "12px" 
      }}
    >
      
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 700, color: "#1F263E", mb: 0.5, lineHeight: 1.2 }}>
          Room: {selectedBooking?.roomNumber || "No Room"}
        </Typography>
        <Typography variant="body2" sx={{ color: "#718096", fontWeight: 500 }}>
          Booked By: {selectedBooking?.user || "Unknown User"}
        </Typography>
      </Box>
    </Box>

    <Grid container spacing={3}>
      
      <Grid size={6}>
        <Typography variant="body2" sx={{ color: "#718096", mb: 0.5, fontWeight: 500 }}>
          Start Date
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 600, color: "#1F263E" }}>
          {selectedBooking?.startDate || "N/A"}
        </Typography>
      </Grid>

      <Grid size={6}>
        <Typography variant="body2" sx={{ color: "#718096", mb: 0.5, fontWeight: 500 }}>
          End Date
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 600, color: "#1F263E" }}>
          {selectedBooking?.endDate || "N/A"}
        </Typography>
      </Grid>

      <Grid size={12} sx={{ mt: 1 }}>
        <Typography variant="body2" sx={{ color: "#718096", mb: 0.5, fontWeight: 500 }}>
          Total Price
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 700, color: "#203FC7" }}>
          {selectedBooking?.totalPrice} EGP
        </Typography>
      </Grid>

    </Grid>
  </DialogContent>

  <DialogActions sx={{ p: 2, borderTop: "1px solid #F0F2F5", mt: 2 }}>
    <Button
      onClick={() => setOpenViewModal(false)}
      variant="contained"
      sx={{
        backgroundColor: "#203FC7",
        color: "#fff",
        textTransform: "none",
        borderRadius: "8px",
        px: 4,
        fontWeight: 500,
        "&:hover": {
          backgroundColor: "#1730A3",
        },
      }}
    >
      Close
    </Button>
  </DialogActions>
</Dialog>
    </>
  );
}
