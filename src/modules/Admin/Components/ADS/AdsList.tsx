import { useEffect, useMemo, useState } from "react";
import { useAds } from "../../../../hooks/useAds";
import type { Ads } from "../../../../types/ads.Type";

import SharedTable from "../../../Shared/Components/CustomTable/CustomTable";
import ActionsMenu from "../../../Shared/Components/CrudMenu/CrudMenu";
import DeleteConfirmation from "../../../Shared/Components/DeleteConfirmation/DeleteConfirmation";

import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import CrudHeader from "../../../Shared/Components/CrudHeader/CrudHeader";

export default function AdsList() {
  const [openModal, setOpenModal] = useState(false);
const [rowToDeleteId, setRowToDeleteId] = useState<string | null>(null);
  const {
    data,
    rooms,
    register,
    handleSubmit,
    onSubmit,
    reset,
    selectedAd,
    setSelectedAd,
    setValue,
    handleDelete,
  } = useAds();

  const rows = useMemo(() => {
  return (data ?? []).map((ad: Ads) => ({
    ...ad,

    id: ad._id,

    roomName: ad.room?.roomNumber,
    price: ad.room?.price,
    discount: ad.room?.discount,
    capacity: ad.room?.capacity,
    active: ad.isActive ? "Yes" : "No",
  }));
}, [data]);

  const columns = [
    {
      field: "roomName",
      headerName: "Room Name",
      flex: 1,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
    },
    {
      field: "discount",
      headerName: "Discount",
      flex: 1,
    },
    {
      field: "capacity",
      headerName: "Capacity",
      flex: 1,
    },
    {
      field: "active",
      headerName: "Active",
      flex: 1,
    },
  ];

  useEffect(() => {
    if (!openModal) {
      reset({
        room: "",
      } as any);

      setSelectedAd(null);
    }
  }, [openModal, reset, setSelectedAd]);
const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
const [selectedRow, setSelectedRow] = useState<any>(null);
const [openDeleteModal, setOpenDeleteModal] = useState(false);

const handleOpen = (
  event: React.MouseEvent<HTMLElement>,
  row: any
) => {
  setAnchorEl(event.currentTarget);
  setSelectedRow(row);
};

const handleClose = () => {
  setAnchorEl(null);
};
  return (
    <>
      <CrudHeader
        title="ADS Table Details"
        subtitle="You can check all details"
        buttonText="Add New Ads"
        onClick={() => {
          reset({
            room: "",
          } as any);

          setSelectedAd(null);
          setOpenModal(true);
        }}
      />
<SharedTable
  rows={rows}
  columns={columns}
  renderActions={(row) => (
    <>
      <IconButton
        onClick={(event) =>
          handleOpen(event, row)
        }
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
            icon: (
              <VisibilityOutlinedIcon fontSize="small" />
            ),
          },
          {
  label: "Edit",
  icon: (
    <EditOutlinedIcon fontSize="small" />
  ),
  onClick: () => {
    if (!selectedRow) return;

    setSelectedAd(selectedRow);

    setValue(
      "discount",
      selectedRow.discount
    );

    setValue(
      "isActive",
      selectedRow.isActive
    );

    setOpenModal(true);

    handleClose();
  },
},
          {
  label: "Delete",
  icon: (
    <DeleteOutlineOutlinedIcon fontSize="small" />
  ),
 onClick: () => {
  setRowToDeleteId(row.id);
  setOpenDeleteModal(true);
},
},
        ]}
      />
    </>
  )}
/>

      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
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
            fontWeight: 700,
            fontSize: "28px",
            color: "#1F263E",
            position: "relative",
          }}
        >
          {selectedAd ? "Update Ads" : "Ads"}

          <IconButton
            onClick={() => setOpenModal(false)}
            sx={{
              position: "absolute",
              right: 15,
              top: 15,
              color: "#D92D20",
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>

  {/* Room */}
{!selectedAd && (
  <FormControl fullWidth sx={{ mt: 2 }}>
    <InputLabel>Room</InputLabel>

    <Select
      label="Room"
      defaultValue=""
      {...register("room")}
    >
      {rooms.map((room) => (
        <MenuItem
          key={room._id}
          value={room._id}
        >
          {room.roomNumber}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
)}
  {/* Discount */}
  <TextField
    fullWidth
    label="Discount"
    placeholder="Discount"
    type="number"
    sx={{ mt: 2 }}
    {...register("discount", {
      valueAsNumber: true,
    })}
  />

  {/* Active */}
  <FormControl fullWidth sx={{ mt: 2 }}>
    <InputLabel>Active</InputLabel>

    <Select
      label="Active"
      defaultValue=""
      {...register("isActive")}
    >
      <MenuItem value="true">Yes</MenuItem>
      <MenuItem value="false">No</MenuItem>
    </Select>
  </FormControl>

</DialogContent>

        <DialogActions
          sx={{
            px: 3,
            pb: 3,
          }}
        >
          <Button
            variant="contained"
            onClick={handleSubmit((data) =>
              onSubmit(data, () => {
                setOpenModal(false);
                setSelectedAd(null);
              })
            )}
            sx={{
              backgroundColor: "#203FC7",
              textTransform: "none",
              borderRadius: "8px",
              px: 4,
            }}
          >
           {selectedAd ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
      <DeleteConfirmation
  open={openDeleteModal}
  onClose={() => setOpenDeleteModal(false)}
  onConfirm={() => {
  if (!rowToDeleteId) return;

  handleDelete(rowToDeleteId);
  setOpenDeleteModal(false);
  setRowToDeleteId(null);
}}
  itemName="Ads"
/>
    </>
  );
}