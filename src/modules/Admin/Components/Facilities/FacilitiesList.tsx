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
import SharedFilter from "../../../Shared/Components/filter/filter";
import { useTranslation } from "react-i18next";
export default function FacilitiesList() {
  const { t } = useTranslation("admin");
  const [openModal, setOpenModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<Facility | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [facilityToDelete, setFacilityToDelete] = useState<Facility | null>(
    null,
  );
  const [searchValue, setSearchValue] = useState("");

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
    paginationModel,
    totalCount,
    setPaginationModel,
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
  { field: "name", headerName: t("facilities.columns.name"), flex: 1 },
  { field: "createdAt", headerName: t("facilities.columns.createdAt"), flex: 1 },
  { field: "createdBy", headerName: t("facilities.columns.createdBy"), flex: 1 },
  { field: "updatedAt", headerName: t("facilities.columns.updatedAt"), flex: 1 },
];

  const filteredRows = rows.filter((facility: any) => {
    const matchesSearch =
      !searchValue ||
      facility.name.toLowerCase().includes(searchValue.toLowerCase());

    return matchesSearch;
  });

  useEffect(() => {
    if (!openModal) {
      setSelectedFacility(null);
      reset({ name: "" });
    }
  }, [openModal, reset, setSelectedFacility]);

  return (
    <>
      <CrudHeader
        title={t("facilities.header.title")}
subtitle={t("facilities.header.subtitle")}
buttonText={t("facilities.header.addButton")}
        onClick={() => {
          setSelectedFacility(null);
          reset({
            name: "",
          });

          setOpenModal(true);
        }}
      />

      <SharedFilter
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        filters={[]}
        values={{}}
        onFilterChange={() => {}}
      />

      <SharedTable
        rows={filteredRows}
        loading={loading}
        columns={columns}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        totalCount={totalCount}
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
                  label: t("facilities.actions.view"),
                  icon: <VisibilityOutlinedIcon fontSize="small" />,
                },
                {
                 label: t("facilities.actions.edit"),
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
                  label: t("facilities.actions.delete"),
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
          {selectedFacility
  ? t("facilities.modal.updateTitle")
  : t("facilities.modal.addTitle")}
        </DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
           label={t("facilities.modal.facilityName")}
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
            {t("facilities.modal.close")}
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
            {selectedFacility
 ? t("facilities.modal.update")
 : t("facilities.modal.save")}
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
  itemName={t("facilities.itemName")}
  confirmText={t("deleteConfirmation.delete")}
  title={t("deleteConfirmation.title", {
    item: t("facilities.itemName"),
  })}
  description={t("deleteConfirmation.description")}
/>
    </>
  );
}
