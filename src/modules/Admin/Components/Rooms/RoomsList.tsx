import React, { useMemo, useState } from 'react'
import CrudHeader from '../../../Shared/Components/CrudHeader/CrudHeader';
import { useRooms } from '../../../../hooks/useRooms';
import type { Room } from '../../../../types/roomTypes';
import SharedTable from '../../../Shared/Components/CustomTable/CustomTable';
import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, IconButton, Typography } from '@mui/material';
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import ActionsMenu from '../../../Shared/Components/CrudMenu/CrudMenu';
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DeleteConfirmation from '../../../Shared/Components/DeleteConfirmation/DeleteConfirmation';
import { useNavigate } from 'react-router-dom';
export default function RoomsList() {
  const { reset, data, setSelectedRoom, selectedRoom, handleDelete,loading } = useRooms();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const navigate = useNavigate();
  const rows = useMemo(() => {
    return (data ?? []).map((room: Room) => ({
      id: room._id,
      _id: room._id,
      roomNumber: room.roomNumber,
      price: room.price,
      capacity: room.capacity,
      discount: room.discount,
      facilities: room.facilities?.map((f) => f.name).join(", ") || "No Facilities",
      createdAt: new Date(room.createdAt).toLocaleDateString("en-GB"),
      updatedAt: new Date(room.updatedAt).toLocaleDateString("en-GB"),
      createdBy: room.createdBy?.userName || "Unknown",
      image: room.images && room.images.length > 0 ? room.images[0] : "",
    }));
  }, [data]);
 const columns = [
  { field: "roomNumber", headerName: "Room Number", flex: 1 },
  { 
    field: "image", 
    headerName: "Image", 
    flex: 1,
    renderCell: (params: any) => {
      return params.value ? (
        <Box
          component="img"
          src={params.value}
          alt="Room"
          sx={{
            width: 50,      
            height: 50,   
            borderRadius: "8px", 
            objectFit: "cover",  
            display: "block",
            my: "5px"     
          }}
        />
      ) : (
        <span style={{ color: "#7E8299", fontSize: "12px" }}>No Image</span> 
      );
    }
  },
  { field: "price", headerName: "Price", flex: 1 },
  { field: "discount", headerName: "Discount", flex: 1 },
  { field: "capacity", headerName: "Capacity", flex: 1 },
  { field: "facilities", headerName: "Facilities", flex: 1.5 },
];
  const handleOpen = (event: React.MouseEvent<HTMLElement>, row: Room) => {
    setAnchorEl(event.currentTarget);

    setSelectedRow(row);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  console.log(selectedRoom);
  return (
    <>
      <Dialog
        open={openViewDialog}
        onClose={() => { setOpenViewDialog(false); setSelectedRoom(null); }}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5' }}>
          Room Details: {selectedRoom?.roomNumber}
        </DialogTitle>
        <DialogContent dividers sx={{ pt: 2 }}>
          <Grid container spacing={2}>
            <Grid size={6}>
              <Typography variant="subtitle2" color="textSecondary">Room Number</Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>{selectedRoom?.roomNumber}</Typography>
            </Grid>
            <Grid size={6}>
              <Typography variant="subtitle2" color="textSecondary">Price per Night</Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>${selectedRoom?.price}</Typography>
            </Grid>

            <Grid size={6}>
              <Typography variant="subtitle2" color="textSecondary">Capacity</Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>{selectedRoom?.capacity} Persons</Typography>
            </Grid>
            <Grid size={6}>
              <Typography variant="subtitle2" color="textSecondary">Discount</Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }} color="error.main">
                {selectedRoom?.discount ? `${selectedRoom.discount}%` : '0%'}
              </Typography>
            </Grid>

            {/* الـ Facilities */}
            <Grid size={12}>
              <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 1 }}>Facilities</Typography>
              {selectedRoom?.facilities && selectedRoom.facilities.length > 0 ? (
                <Grid container spacing={1}>
                  {selectedRoom.facilities.map((facility) => (
                    <Grid key={facility._id}>
                      <Chip label={facility.name} color="primary" variant="outlined" size="small" />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Typography variant="body2" color="textSecondary">No Facilities available</Typography>
              )}
            </Grid>

            <Grid size={12}>
              <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 1 }}>
                Room Images
              </Typography>

              {selectedRoom?.images?.length ? (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      overflowX: "auto",
                      pb: 1,
                    }}
                  >
                    {selectedRoom.images.map((img, index) => (
                      <Box
                        key={index}
                        component="img"
                        src={img}
                        alt={`Room ${index + 1}`}
                        sx={{
                          width: 90,
                          height: 70,
                          objectFit: "cover",
                          borderRadius: 1,
                          border: "1px solid #ddd",
                          cursor: "pointer",
                        }}
                      />
                    ))}
                  </Box>
                </>
              ) : (
                <Typography variant="body2" color="textSecondary">
                  No Images available
                </Typography>
              )}
            </Grid>

            <Grid size={12}>
              <Divider sx={{ my: 1 }} />
            </Grid>

            <Grid size={12}>
              <Typography variant="subtitle2" color="textSecondary">Created By</Typography>
              <Typography variant="body2">{selectedRoom?.createdBy?.userName || 'Unknown'}</Typography>
            </Grid>
            <Grid size={12}>
              <Typography variant="subtitle2" color="textSecondary">Created At</Typography>
              <Typography variant="body2">
                {selectedRoom?.createdAt ? new Date(selectedRoom.createdAt).toLocaleDateString("en-GB") : ''}
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2, bgcolor: '#f5f5f5' }}>
          <Button variant="contained" onClick={() => { setOpenViewDialog(false); setSelectedRoom(null); }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <CrudHeader
        title="Rooms Table Details"
        subtitle="You can check all details"
        buttonText="Add New Room"
        onClick={() => {
          setSelectedRoom(null);
          reset({});
          navigate("/admin/room-data");
        }}
      />
      <SharedTable
        key={data.length}
        rows={rows}
        columns={columns}
        renderActions={(row) => (
          <>
            <IconButton
              onClick={(event) => {
                event.stopPropagation();

                handleOpen(event, row as any);

                const originalRoom = data.find((r) => r._id === row._id);

                if (originalRoom) {
                  setSelectedRoom(originalRoom);
                }
              }}
            >

              <MoreHorizOutlinedIcon />
            </IconButton>

            <ActionsMenu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              actions={[
                {
                  label: "View",
                  icon: <VisibilityOutlinedIcon fontSize="small" />,
                  onClick: () => {
                    if (selectedRow) {
                      const originalRoom = data.find((r) => r._id === selectedRow._id);
                      if (originalRoom) {
                        setSelectedRoom(originalRoom);
                      }
                      setOpenViewDialog(true);
                    }
                    handleClose();
                  },
                },
                {
                  label: "Edit",
                  icon: <EditOutlinedIcon fontSize="small" />,
                  onClick: () => {
                    if (selectedRow) {
                      const originalRoom = data.find((r) => r._id === selectedRow._id);

                      if (originalRoom) {
                        setSelectedRoom(originalRoom);
                        navigate(`/admin/room-data/${selectedRow._id}`);
                      }
                    }
                  },
                },
                {
                  label: "Delete",
                  icon: <DeleteOutlineOutlinedIcon fontSize="small" />,
                  danger: true,
                  onClick: () => {
                    if (selectedRow) {
                      const originalRoom = data.find((r) => r._id === selectedRow._id);
                      if (originalRoom) {
                        setSelectedRoom(originalRoom);
                      }
                      setOpenDeleteModal(true);
                    }
                    handleClose();
                  },
                },
              ]}
            />
          </>
        )}
      />
      <DeleteConfirmation
        open={openDeleteModal}
        onClose={() => {
          setOpenDeleteModal(false);
          setSelectedRoom(null);
          setSelectedRow(null);
        }}
        onConfirm={() => {
          const roomId = selectedRoom?._id || selectedRow?._id;
          if (roomId) {
            handleDelete(roomId);
            setOpenDeleteModal(false);
            setSelectedRoom(null);
            setSelectedRow(null);
          }
        }}
        itemName={`Room ${selectedRow?.roomNumber || ""}`}
      />
    </>
  )
}
