import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton,
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
  const { data } = useBooking();
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
              borderRadius: "12px",
            },
          },
        }}>
        <DialogTitle
          sx={{
            fontWeight: 600,
            color: "#1F263E",
            fontSize: "18px",
            pb: 2,
            borderBottom: "1px solid #E2E5EB", 
          }}>
          Booking Details
        </DialogTitle>

        <DialogContent sx={{ mt: 3, pb: 2 }}>
          <Grid container spacing={3}>
            <Grid size={6}>
              <Typography
                variant="body2"
                sx={{ color: "#718096", mb: 0.5, fontWeight: 500 }}>
                User Name
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontWeight: 600, color: "#1F263E" }}>
                {selectedBooking?.user || "Unknown User"}
              </Typography>
            </Grid>

            <Grid size={6}>
              <Typography
                variant="body2"
                sx={{ color: "#718096", mb: 0.5, fontWeight: 500 }}>
                Room Number
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontWeight: 600, color: "#1F263E" }}>
                {selectedBooking?.roomNumber || "No Room"}
              </Typography>
            </Grid>
            

            <Grid size={6}>
              <Typography
                variant="body2"
                sx={{ color: "#718096", mb: 0.5, fontWeight: 500 }}>
                Start Date
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontWeight: 600, color: "#1F263E" }}>
                {selectedBooking?.startDate}
              </Typography>
            </Grid>
                        <Grid size={6}>
              <Typography
                variant="body2"
                sx={{ color: "#718096", mb: 0.5, fontWeight: 500 }}>
                Status
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontWeight: 600, color: "#203FC7" }}>
                {selectedBooking?.status || "No Room"}
              </Typography>
            </Grid>
            <Grid size={6}>
              <Typography
                variant="body2"
                sx={{ color: "#718096", mb: 0.5, fontWeight: 500 }}>
                End Date
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontWeight: 600, color: "#1F263E" }}>
                {selectedBooking?.endDate}
              </Typography>
            </Grid>
            
            


            <Grid size={12} sx={{ mt: 1 }}>
              <Typography
                variant="body2"
                sx={{ color: "#718096", mb: 0.5, fontWeight: 500 }}>
                Total Price
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "#203FC7" }}>
                {selectedBooking?.totalPrice} EGP
              </Typography>
            </Grid>
          </Grid>
          
        </DialogContent>

        <DialogActions sx={{ p: 2, borderTop: "1px solid #F0F2F5" }}>
          <Button
            onClick={() => setOpenViewModal(false)}
            variant="outlined"
            sx={{
              color: "#4A5568",
              borderColor: "#E2E5EB",
              textTransform: "none",
              borderRadius: "6px",
              px: 3,
              "&:hover": {
                borderColor: "#CBD5E1",
                backgroundColor: "#F8F9FB",
              },
            }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
