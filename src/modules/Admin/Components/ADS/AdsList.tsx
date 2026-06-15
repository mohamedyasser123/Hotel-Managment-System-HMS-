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
  Typography,
  Grid,
  Chip,
  Box,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import CrudHeader from "../../../Shared/Components/CrudHeader/CrudHeader";
import SharedFilter from "../../../Shared/Components/filter/filter";

export default function AdsList() {
  const [openModal, setOpenModal] = useState(false);
  const [rowToDeleteId, setRowToDeleteId] = useState<string | null>(null);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [selectedAdView, setSelectedAdView] = useState<any>(null);
  const {
    data,
    rooms,
    loading,
    register,
    handleSubmit,
    onSubmit,
    reset,
    selectedAd,
    setSelectedAd,
    setValue,
    handleDelete,
    paginationModel,
    setPaginationModel,
    totalCount,
  } = useAds();
  const [searchValue, setSearchValue] = useState("");

  const [filters, setFilters] = useState({
    isActive: "",
    price: "",
  });
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

  const filteredRows = useMemo(() => {
    return rows.filter((row: any) => {
      const matchesSearch =
        !searchValue ||
        row.roomName?.toLowerCase().includes(searchValue.toLowerCase());

      const matchesActive =
        !filters.isActive || String(row.isActive) === filters.isActive;

      const matchesPrice =
        !filters.price ||
        (filters.price === "low" ? row.price < 2000 : row.price >= 2000);

      return matchesSearch && matchesActive && matchesPrice;
    });
  }, [rows, searchValue, filters]);

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

  const handleOpen = (event: React.MouseEvent<HTMLElement>, row: any) => {
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
      <SharedFilter
        searchValue={searchValue}
        onSearchChange={setSearchValue}
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
            placeholder: "Price",
            options: [
              { label: "Low (<2000)", value: "low" },
              { label: "High (>=2000)", value: "high" },
            ],
          },
          {
            key: "isActive",
            placeholder: "Active Status",
            options: [
              { label: "Active", value: "true" },
              { label: "Inactive", value: "false" },
            ],
          },
        ]}
      />
      <SharedTable
        rows={filteredRows}
        columns={columns}
        loading={loading}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        totalCount={totalCount}
        renderActions={(row) => (
          <>
            <IconButton onClick={(event) => handleOpen(event, row)}>
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
                    setSelectedAdView(row);
                    setOpenViewModal(true);
                    handleClose();
                  },
                },
                {
                  label: "Edit",
                  icon: <EditOutlinedIcon fontSize="small" />,
                  onClick: () => {
                    if (!selectedRow) return;

                    setSelectedAd(selectedRow);

                    setValue("discount", selectedRow.discount);

                    setValue("isActive", selectedRow.isActive);

                    setOpenModal(true);

                    handleClose();
                  },
                },
                {
                  label: "Delete",
                  icon: <DeleteOutlineOutlinedIcon fontSize="small" />,
onClick: () => {
  setRowToDeleteId(row._id);
  setOpenDeleteModal(true);
}
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
        }}>
        <DialogTitle
          sx={{
            fontWeight: 700,
            fontSize: "28px",
            color: "#1F263E",
            position: "relative",
          }}>
          {selectedAd ? "Update Ads" : "Ads"}

          <IconButton
            onClick={() => setOpenModal(false)}
            sx={{
              position: "absolute",
              right: 15,
              top: 15,
              color: "#D92D20",
            }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          {/* Room */}
          {!selectedAd && (
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Room</InputLabel>

              <Select label="Room" defaultValue="" {...register("room")}>
                {rooms.map((room) => (
                  <MenuItem key={room._id} value={room._id}>
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

            <Select label="Active" defaultValue="" {...register("isActive")}>
              <MenuItem value="true">Yes</MenuItem>
              <MenuItem value="false">No</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>

        <DialogActions
          sx={{
            px: 3,
            pb: 3,
          }}>
          <Button
            variant="contained"
            onClick={handleSubmit((data) =>
              onSubmit(data, () => {
                setOpenModal(false);
                setSelectedAd(null);
              }),
            )}
            sx={{
              backgroundColor: "#203FC7",
              textTransform: "none",
              borderRadius: "8px",
              px: 4,
            }}>
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
        }}>
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
          }}>
          Ads Details
          <Chip
            label={selectedAdView?.isActive ? "Active" : "Inactive"}
            color={selectedAdView?.isActive ? "success" : "error"}
            size="small"
            sx={{ fontWeight: 600, borderRadius: "6px" }}
          />
        </DialogTitle>

        <DialogContent sx={{ mt: 3, pb: 2 }}>
          {/* ROOM HEADER */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
              mb: 4,
              backgroundColor: "#F8F9FB",
              p: 2,
              borderRadius: "12px",
            }}>
            <Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "#1F263E" }}>
                Room #{selectedAdView?.room?.roomNumber || "N/A"}
              </Typography>

              <Typography variant="body2" sx={{ color: "#718096" }}>
                Capacity: {selectedAdView?.room?.capacity || 0}
              </Typography>
            </Box>

            <Chip
              label={`${selectedAdView?.room?.price || 0} EGP`}
              sx={{
                fontWeight: 600,
                backgroundColor: "#203FC7",
                color: "#fff",
              }}
            />
          </Box>

          {/* DETAILS GRID */}
          <Grid container spacing={3}>
            <Grid size={6}>
              <Typography sx={{ color: "#718096", fontSize: 13 }}>
                Price
              </Typography>
              <Typography sx={{ fontWeight: 600 }}>
                {selectedAdView?.room?.price || 0} EGP
              </Typography>
            </Grid>

            <Grid size={6}>
              <Typography sx={{ color: "#718096", fontSize: 13 }}>
                Discount
              </Typography>
              <Typography sx={{ fontWeight: 600 }}>
                {selectedAdView?.room?.discount || 0}%
              </Typography>
            </Grid>

            <Grid size={12}>
              <Typography sx={{ color: "#718096", fontSize: 13 }}>
                Active Status
              </Typography>
              <Typography sx={{ fontWeight: 600 }}>
                {selectedAdView?.isActive ? "Yes" : "No"}
              </Typography>
            </Grid>

            <Grid size={6}>
              <Typography sx={{ color: "#718096", fontSize: 13 }}>
                Created At
              </Typography>
              <Typography sx={{ fontWeight: 600 }}>
                {selectedAdView?.createdAt
                  ? new Date(selectedAdView.createdAt).toLocaleDateString(
                      "en-GB",
                    )
                  : "N/A"}
              </Typography>
            </Grid>

            <Grid size={6}>
              <Typography sx={{ color: "#718096", fontSize: 13 }}>
                Updated At
              </Typography>
              <Typography sx={{ fontWeight: 600 }}>
                {selectedAdView?.updatedAt
                  ? new Date(selectedAdView.updatedAt).toLocaleDateString(
                      "en-GB",
                    )
                  : "N/A"}
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
              "&:hover": { backgroundColor: "#1730A3" },
            }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}