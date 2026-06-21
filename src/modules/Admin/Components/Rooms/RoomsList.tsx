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
import SharedFilter from '../../../Shared/Components/filter/filter';
import { useFacilities } from '../../../../hooks/useFacilities';
import { useTranslation } from "react-i18next";
export default function RoomsList() {
  const { t } = useTranslation("admin");
  const { reset, data, setSelectedRoom, selectedRoom, handleDelete,loading,setPaginationModel,paginationModel,totalCount } = useRooms();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

const [filters, setFilters] = useState({
   price: "",
  facility: "",
});
const { data: facilities } = useFacilities();
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
  { field: "roomNumber", headerName: t("rooms.columns.roomNumber"), flex: 1 },
  { 
    field: "image", 
    headerName: t("rooms.columns.image"),
    flex: 1,
    renderCell: (params: any) => {
      return params.value ? (
        <Box
          component="img"
          src={params.value}
          alt={t("rooms.itemName")}
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
        <span style={{ color: "#7E8299", fontSize: "12px" }}>{t("rooms.common.noImage")}</span> 
      );
    }
  },
  { field: "price", headerName: t("rooms.columns.price"), flex: 1 },
  { field: "discount", headerName: t("rooms.columns.discount"), flex: 1 },
  { field: "capacity", headerName: t("rooms.columns.capacity"), flex: 1 },
  { field: "facilities",headerName: t("rooms.columns.facilities"), flex: 1.5 },
];
  const handleOpen = (event: React.MouseEvent<HTMLElement>, row: Room) => {
    setAnchorEl(event.currentTarget);

    setSelectedRow(row);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const filteredRows = rows.filter((room) => {
  const matchesSearch =
    !search ||
    room.roomNumber
      .toString()
      .toLowerCase()
      .includes(search.toLowerCase());

  const matchesPrice =
    !filters.price ||
    room.price <= Number(filters.price);

  const matchesFacility =
    !filters.facility ||
    room.facilities
      .toLowerCase()
      .includes(filters.facility.toLowerCase());

  return (
    matchesSearch &&
    matchesPrice&&
    matchesFacility
  );
});

  return (
    <>
      <Dialog
        open={openViewDialog}
        onClose={() => { setOpenViewDialog(false); setSelectedRoom(null); }}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5' }}>
         {t("rooms.view.title")}: {selectedRoom?.roomNumber}
        </DialogTitle>
        <DialogContent dividers sx={{ pt: 2 }}>
          <Grid container spacing={2}>
            <Grid size={6}>
              <Typography variant="subtitle2" color="textSecondary">{t("rooms.view.roomNumber")}</Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>{selectedRoom?.roomNumber}</Typography>
            </Grid>
            <Grid size={6}>
              <Typography variant="subtitle2" color="textSecondary">{t("rooms.view.pricePerNight")}</Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>${selectedRoom?.price}</Typography>
            </Grid>

            <Grid size={6}>
              <Typography variant="subtitle2" color="textSecondary">{t("rooms.view.capacity")}</Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>{selectedRoom?.capacity} {t("rooms.view.persons")}</Typography>
            </Grid>
            <Grid size={6}>
              <Typography variant="subtitle2" color="textSecondary">{t("rooms.view.discount")}</Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }} color="error.main">
                {selectedRoom?.discount ? `${selectedRoom.discount}%` : '0%'}
              </Typography>
            </Grid>

            {/* الـ Facilities */}
            <Grid size={12}>
              <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 1 }}>{t("rooms.view.facilities")}</Typography>
              {selectedRoom?.facilities && selectedRoom.facilities.length > 0 ? (
                <Grid container spacing={1}>
                  {selectedRoom.facilities.map((facility) => (
                    <Grid key={facility._id}>
                      <Chip label={facility.name} color="primary" variant="outlined" size="small" />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Typography variant="body2" color="textSecondary">{t("rooms.common.noFacilitiesAvailable")}</Typography>
              )}
            </Grid>

            <Grid size={12}>
              <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 1 }}>
                {t("rooms.view.roomImages")}
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
                       alt={`${t("rooms.itemName")} ${index + 1}`}
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
                  {t("rooms.common.noImagesAvailable")}
                </Typography>
              )}
            </Grid>

            <Grid size={12}>
              <Divider sx={{ my: 1 }} />
            </Grid>

            <Grid size={12}>
              <Typography variant="subtitle2" color="textSecondary">{t("rooms.view.createdBy")}</Typography>
              <Typography variant="body2">{selectedRoom?.createdBy?.userName || 'Unknown'}</Typography>
            </Grid>
            <Grid size={12}>
              <Typography variant="subtitle2" color="textSecondary">{t("rooms.view.createdAt")}</Typography>
              <Typography variant="body2">
                {selectedRoom?.createdAt ? new Date(selectedRoom.createdAt).toLocaleDateString("en-GB") : ''}
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2, bgcolor: '#f5f5f5' }}>
          <Button variant="contained" onClick={() => { setOpenViewDialog(false); setSelectedRoom(null); }}>
           {t("rooms.view.close")}
          </Button>
        </DialogActions>
      </Dialog>
      <CrudHeader
       title={t("rooms.header.title")}
subtitle={t("rooms.header.subtitle")}
buttonText={t("rooms.header.addButton")}
        onClick={() => {
          setSelectedRoom(null);
          reset({});
          navigate("/admin/room-data");
        }}
      />
      <SharedFilter
  searchValue={search}
  onSearchChange={setSearch}
  values={filters}
  onFilterChange={(key, value) =>
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }))
  }
  filters={[
    {
  key: "price",
 placeholder: t("rooms.filters.price"),
  options: [
    { label: t("rooms.filters.less1000"), value: "1000" },
    { label: t("rooms.filters.less2000"), value: "2000" },
    { label: t("rooms.filters.less3000"), value: "3000" },
  ],
},
    {
      key: "facility",
      placeholder: t("rooms.filters.facilities"),
      options: facilities.map((f) => ({
  label: f.name,
  value: f.name,
}))
    },
  ]}
/>
      <SharedTable
        key={data.length}
        rows={filteredRows}
        columns={columns}
        loading={loading}
         paginationModel={paginationModel}
  onPaginationModelChange={setPaginationModel}
  totalCount={totalCount}
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
                  label: t("rooms.actions.view"),
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
                  label: t("rooms.actions.edit"),
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
                  label: t("rooms.actions.delete"),
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
  itemName={`${t("rooms.itemName")} ${selectedRow?.roomNumber || ""}`}
  title={t("deleteConfirmation.title", {
    item: `${t("rooms.itemName")} ${selectedRow?.roomNumber || ""}`,
  })}
  confirmText={t("deleteConfirmation.delete")}
/>
    </>
  )
}
