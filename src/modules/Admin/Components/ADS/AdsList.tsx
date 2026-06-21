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
import { useTranslation } from "react-i18next";
export default function AdsList() {
  const { t, i18n } = useTranslation("admin");
  const [openModal, setOpenModal] = useState(false);
  const [rowToDeleteId, setRowToDeleteId] = useState<string | null>(null);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [selectedAdView, setSelectedAdView] = useState<any>(null);
  
  const [searchValue, setSearchValue] = useState("");
  const [filters, setFilters] = useState({
    isActive: "",
    price: "",
  });

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
  // 💡 تنبيه: يفضل تمرير searchValue و filters داخل useAds() لو الـ hook عندك بيدعم الـ Server filtering.

  // عند كتابة أي كلمة بحث أو تغيير الفلاتر، نرجع تلقائياً للصفحة الأولى حتى لا يحدث تعليق في الـ Pagination
  useEffect(() => {
    setPaginationModel((prev) => ({ ...prev, page: 0 }));
  }, [searchValue, filters, setPaginationModel]);

  const rows = useMemo(() => {
    return (data ?? []).map((ad: Ads) => ({
      ...ad,
      id: ad._id,
      roomName: ad.room?.roomNumber,
      price: ad.room?.price,
      discount: ad.room?.discount,
      capacity: ad.room?.capacity,
      active: ad.isActive
  ? t("ads.common.yes")
  : t("ads.common.no"),
    }));
 }, [data, t]);

  const columns = [
  { field: "roomName", headerName: t("ads.columns.roomName"), flex: 1 },
  { field: "price", headerName: t("ads.columns.price"), flex: 1 },
  { field: "discount", headerName: t("ads.columns.discount"), flex: 1 },
  { field: "capacity", headerName: t("ads.columns.capacity"), flex: 1 },
  { field: "active", headerName: t("ads.columns.active"), flex: 1 },
];

  /* 
    💡 تعديل جوهري: 
    لو الباجينيشن Server-side، بنباصي الـ rows علطول للجدول بدون فلاتر فرونت عشان الأرقام والصفحات تظبط.
    أما لو الداتا بتجيلك كاملة مرة واحدة (Client-side)، فالمشكلة كانت في الـ totalCount اللي لازم تساوي filteredRows.length وليس totalCount القادمة من السيرفر.
    بناءً على الكود، الإجراء الصحيح هنا هو الاعتماد على الـ Server-side مباشرة:
  */

  useEffect(() => {
    if (!openModal) {
      reset({ room: "" } as any);
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
        title={t("ads.header.title")}
subtitle={t("ads.header.subtitle")}
buttonText={t("ads.header.addButton")}
        onClick={() => {
          reset({ room: "" } as any);
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
            placeholder: t("ads.filters.price"),
            options: [
             { label: t("ads.filters.lowPrice"), value: "low" },
{ label: t("ads.filters.highPrice"), value: "high" },
            ],
          },
          {
            key: "isActive",
           placeholder: t("ads.filters.activeStatus"),
            options: [
              { label: t("ads.filters.active"), value: "true" },
{ label: t("ads.filters.inactive"), value: "false" },
            ],
          },
        ]}
      />

      <SharedTable
        rows={rows} 
        columns={columns}
        loading={loading}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        totalCount={totalCount} // 
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
                  label: t("ads.actions.view"),
                  icon: <VisibilityOutlinedIcon fontSize="small" />,
                  onClick: () => {
                    setSelectedAdView(row);
                    setOpenViewModal(true);
                    handleClose();
                  },
                },
                {
                  label: t("ads.actions.edit"),
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
                  label: t("ads.actions.delete"),
                  icon: <DeleteOutlineOutlinedIcon fontSize="small" />,
                  onClick: () => {
                    if (selectedRow) {
                      setRowToDeleteId(selectedRow.id);
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

      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        fullWidth
        maxWidth="sm"
        slotProps={{ paper: { sx: { borderRadius: "16px", p: 1 } } }}
      >
        <DialogTitle sx={{ fontWeight: 700, fontSize: "28px", color: "#1F263E", position: "relative" }}>
         {selectedAd
  ? t("ads.modal.updateTitle")
  : t("ads.modal.createTitle")}
         <IconButton
  onClick={() => setOpenModal(false)}
  sx={{
    position: "absolute",
    top: 15,
    right: i18n.language === "ar" ? "auto" : 15,
    left: i18n.language === "ar" ? 15 : "auto",
    color: "#D92D20",
  }}
>
  <CloseIcon />
</IconButton>
        </DialogTitle>
        <DialogContent>
          {!selectedAd && (
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>{t("ads.modal.room")}</InputLabel>
              <Select label={t("ads.modal.room")} defaultValue="" {...register("room")}>
                {rooms.map((room) => (
                  <MenuItem key={room._id} value={room._id}>
                    {room.roomNumber}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          <TextField
            fullWidth
            label={t("ads.modal.discount")}
placeholder={t("ads.modal.discount")}
            type="number"
            sx={{ mt: 2 }}
            {...register("discount", { valueAsNumber: true })}
          />
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>{t("ads.modal.active")}</InputLabel>
            <Select label={t("ads.modal.active")} defaultValue="" {...register("isActive")}>
             <MenuItem value="true">
  {t("ads.common.yes")}
</MenuItem>

<MenuItem value="false">
  {t("ads.common.no")}
</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            variant="contained"
            onClick={handleSubmit((data) =>
              onSubmit(data, () => {
                setOpenModal(false);
                setSelectedAd(null);
              }),
            )}
            sx={{ backgroundColor: "#203FC7", textTransform: "none", borderRadius: "8px", px: 4 }}
          >
            {selectedAd
  ? t("ads.modal.update")
  : t("ads.modal.save")}
          </Button>
        </DialogActions>
      </Dialog>

      {/* مودال التأكيد على الحذف */}
      <DeleteConfirmation
  open={openDeleteModal}
  onClose={() => setOpenDeleteModal(false)}
  onConfirm={() => {
    if (!rowToDeleteId) return;
    handleDelete(rowToDeleteId);
    setOpenDeleteModal(false);
    setRowToDeleteId(null);
  }}
  itemName={t("ads.itemName")}
  confirmText={t("deleteConfirmation.delete")}
  title={t("deleteConfirmation.title", {
    item: t("ads.itemName"),
  })}
  description={t("deleteConfirmation.description")}
/>

      {/* مودال العرض */}
      <Dialog
        open={openViewModal}
        onClose={() => setOpenViewModal(false)}
        fullWidth
        maxWidth="sm"
        slotProps={{ paper: { sx: { borderRadius: "16px", p: 1 } } }}
      >
        <DialogTitle sx={{ fontWeight: 600, color: "#1F263E", fontSize: "18px", pb: 2, borderBottom: "1px solid #E2E5EB", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
         {t("ads.view.title")}
          <Chip label={selectedAdView?.isActive ? t("ads.filters.active") : t("ads.filters.inactive")} color={selectedAdView?.isActive ? "success" : "error"} size="small" sx={{ fontWeight: 600, borderRadius: "6px" }} />
        </DialogTitle>
        <DialogContent sx={{ mt: 3, pb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2, mb: 4, backgroundColor: "#F8F9FB", p: 2, borderRadius: "12px" }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: "#1F263E" }}>
                {t("ads.view.room")} #{selectedAdView?.room?.roomNumber || t("ads.view.notAvailable")}
              </Typography>
              <Typography variant="body2" sx={{ color: "#718096" }}>
               {t("ads.view.capacity")}: {selectedAdView?.room?.capacity || 0}
              </Typography>
            </Box>
            <Chip
  label={`${selectedAdView?.room?.price || 0} ${t("ads.view.currency")}`}
  sx={{
    fontWeight: 600,
    backgroundColor: "#203FC7",
    color: "#fff",
  }}
/>
          </Box>
          <Grid container spacing={3}>
            <Grid size={6}>
              <Typography sx={{ color: "#718096", fontSize: 13 }}>
  {t("ads.view.price")}
</Typography>
              <Typography sx={{ fontWeight: 600 }}>
  {`${selectedAdView?.room?.price || 0} ${t("ads.view.currency")}`}
</Typography>
            </Grid>
            <Grid size={6}>
              <Typography sx={{ color: "#718096", fontSize: 13 }}>
  {t("ads.view.discount")}
</Typography>
              <Typography sx={{ fontWeight: 600 }}>{selectedAdView?.room?.discount || 0}%</Typography>
            </Grid>
            <Grid size={12}>
             <Typography sx={{ color: "#718096", fontSize: 13 }}>
  {t("ads.view.activeStatus")}
</Typography>
              <Typography sx={{ fontWeight: 600 }}>{selectedAdView?.isActive
  ? t("ads.common.yes")
  : t("ads.common.no")}</Typography>
            </Grid>
            <Grid size={6}>
              <Typography sx={{ color: "#718096", fontSize: 13 }}>{t("ads.view.createdAt")}</Typography>
              <Typography sx={{ fontWeight: 600 }}>{selectedAdView?.createdAt ? new Date(selectedAdView.createdAt).toLocaleDateString(
  i18n.language === "ar" ? "ar-EG" : "en-GB"
) :  t("ads.view.notAvailable")}</Typography>
            </Grid>
            <Grid size={6}>
              <Typography sx={{ color: "#718096", fontSize: 13 }}>{t("ads.view.updatedAt")}</Typography>
              <Typography sx={{ fontWeight: 600 }}>{selectedAdView?.updatedAt ? new Date(selectedAdView.updatedAt).toLocaleDateString(
  i18n.language === "ar" ? "ar-EG" : "en-GB"
) :  t("ads.view.notAvailable")}</Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2, borderTop: "1px solid #F0F2F5", mt: 2 }}>
          <Button onClick={() => setOpenViewModal(false)} variant="contained" sx={{ backgroundColor: "#203FC7", color: "#fff", textTransform: "none", borderRadius: "8px", px: 4, "&:hover": { backgroundColor: "#1730A3" } }}>
            {t("ads.view.close")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}