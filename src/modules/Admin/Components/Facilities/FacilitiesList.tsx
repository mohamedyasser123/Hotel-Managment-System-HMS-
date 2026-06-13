import { useEffect, useMemo, useState } from "react";
import { useFacilities } from "../../../../hooks/useFacilities";
import type { Facility } from "../../../../types/facilitiesTyepes";
import SharedTable from "../../../Shared/Components/CustomTable/CustomTable";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import ActionsMenu from "../../../Shared/Components/CrudMenu/CrudMenu";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CrudHeader from "../../../Shared/Components/CrudHeader/CrudHeader";
import DeleteConfirmation from "../../../Shared/Components/DeleteConfirmation/DeleteConfirmation";

export default function FacilitiesList() {
  const [openModal, setOpenModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<Facility | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [facilityToDelete, setFacilityToDelete] = useState<Facility | null>(
    null,
  );

  const handleOpen = (event: React.MouseEvent<HTMLElement>, row: Facility) => {
    setAnchorEl(event.currentTarget);

    setSelectedRow(row);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const {
    data,
    loading,
    register,
    handleSubmit,
    onSubmit,
    reset,
    selectedFacility,
    setSelectedFacility,
    setValue,
    handleDelete,
  } = useFacilities();

  const rows = useMemo(() => {
    return (data ?? []).map((facility: Facility) => ({
      id: facility._id,
      _id: facility._id,
      name: facility.name,
      createdAt: new Date(facility.createdAt).toLocaleDateString("en-GB"),
      updatedAt: new Date(facility.updatedAt).toLocaleDateString("en-GB"),
      createdBy: facility.createdBy?.userName,
    }));
  }, [data]);
  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "createdAt", headerName: "Created At", flex: 1 },
    { field: "createdBy", headerName: "Created By", flex: 1 },
    { field: "updatedAt", headerName: "Updated At", flex: 1 },
  ];

  useEffect(() => {
    if (!openModal) {
      setSelectedFacility(null);
      reset({ name: "" });
    }
  }, [openModal, reset]);

  return (
    <>
      <CrudHeader
        title="Facilities Table Details"
        subtitle="You can check all details"
        buttonText="Add New Facilities"
        onClick={() => {
          setSelectedFacility(null);

          reset({
            name: "",
          });

          setOpenModal(true);
        }}
      />

      <SharedTable
        rows={rows}
        columns={columns}
        loading={loading}
        renderActions={(row) => (
          <>
            <IconButton onClick={(event) => handleOpen(event, row as any)}>
              <MoreHorizOutlinedIcon />
            </IconButton>

            <ActionsMenu
              anchorEl={anchorEl}
              open={Boolean(anchorEl) && selectedRow?._id === row._id}
              onClose={handleClose}
              actions={[
                {
                  label: "View",
                  icon: <VisibilityOutlinedIcon fontSize="small" />,
                },
                {
                  label: "Edit",
                  icon: <EditOutlinedIcon fontSize="small" />,
                  onClick: () => {
                    if (!selectedRow) return;

                    setSelectedFacility(selectedRow);

                    setValue("name", selectedRow.name);

                    setOpenModal(true);

                    handleClose();
                  },
                },
                {
                  label: "Delete",
                  icon: <DeleteOutlineOutlinedIcon fontSize="small" />,
                  danger: true,
                  onClick: () => {
                    if (!selectedRow) return;

                    setFacilityToDelete(selectedRow);

                    setOpenDeleteModal(true);

                    handleClose();
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
        maxWidth="sm">
        <DialogTitle
          sx={{
            fontWeight: 600,
            color: "#1F263E",
          }}>
          {selectedFacility ? "Update Facility" : "Add Facility"}
        </DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            label="Facility Name"
            sx={{
              mt: 2,
              backgroundColor: "#F8F9FB",
              border: "none",
              outline: "none",
            }}
            {...register("name")}
          />
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={() => setOpenModal(false)}
            sx={{
              color: "#323C47",
              textTransform: "none",
            }}>
            Close
          </Button>

          <Button
            variant="contained"
            onClick={handleSubmit((data) =>
              onSubmit(data, () => {
                setOpenModal(false);
                setSelectedFacility(null);
              }),
            )}
            sx={{
              backgroundColor: "#203FC7",
              textTransform: "none",
              borderRadius: "8px",
            }}>
            {selectedFacility ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>

      <DeleteConfirmation
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onConfirm={() => {
          if (!facilityToDelete) return;

          handleDelete(facilityToDelete._id);

          setFacilityToDelete(null);

          setOpenDeleteModal(false);
        }}
        itemName="Facility"
      />
    </>
  );
}
