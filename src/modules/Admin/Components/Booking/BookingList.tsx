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
import SharedFilter from "../../../Shared/Components/filter/filter";
import { useTranslation } from "react-i18next";
export default function BookingList() {
  const { t, i18n } = useTranslation("admin");
  const { data, loading, paginationModel, totalCount, setPaginationModel } =
    useBooking();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const [filters, setFilters] = useState({
    price: "",
  });

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

      startDate: new Date(booking.startDate).toLocaleDateString(
  i18n.language === "ar" ? "ar-EG" : "en-GB"
),

      endDate: new Date(booking.endDate).toLocaleDateString(
  i18n.language === "ar" ? "ar-EG" : "en-GB"
),

     user: booking.user?.userName || "Unknown User",
      status: booking.status,
    }));
 }, [data, i18n.language]);

 const columns = [
  {
    field: "roomNumber",
    headerName: t("booking.columns.roomNumber"),
    flex: 1,
  },
  {
    field: "totalPrice",
    headerName: t("booking.columns.price"),
    flex: 1,
  },
  {
    field: "startDate",
    headerName: t("booking.columns.startDate"),
    flex: 1,
  },
  {
    field: "endDate",
    headerName: t("booking.columns.endDate"),
    flex: 1,
  },
  {
    field: "user",
    headerName: t("booking.columns.user"),
    flex: 1,
  },
  {
    field: "status",
    headerName: t("booking.columns.status"),
    flex: 1,
  },
];

  const filteredRows = rows.filter((booking: any) => {
    const matchesSearch =
      !searchValue ||
      booking.user.toLowerCase().includes(searchValue.toLowerCase());

    const matchesPrice =
      !filters.price || booking.totalPrice <= Number(filters.price);

    return matchesSearch && matchesPrice;
  });

  return (
    <>
      <CrudHeader
        title={t("booking.header.title")}
subtitle={t("booking.header.subtitle")}
      />
      <SharedFilter
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        filters={[
          {
            key: "price",
            placeholder: t("booking.filters.price"),
            options: [
             { label: t("booking.filters.less1000"), value: "1000" },
{ label: t("booking.filters.less2000"), value: "2000" },
{ label: t("booking.filters.less3000"), value: "3000" },
            ],
          },
        ]}
        values={filters}
        onFilterChange={(key, value) =>
          setFilters((prev) => ({
            ...prev,
            [key]: value,
          }))
        }
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
            <IconButton onClick={(event) => handleOpen(event, row.id)}>
              <MoreHorizOutlinedIcon />
            </IconButton>
            <ActionsMenu
              anchorEl={anchorEl}
              open={Boolean(anchorEl) && selectedRowId === row.id}
              onClose={handleClose}
              actions={[
                {
                 label: t("booking.actions.view"),
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
          {t("booking.view.title")}
          <Chip
           label={selectedBooking?.status || "Pending"}
            color={
              selectedBooking?.status === "Completed" ||
              selectedBooking?.status === "Confirmed"
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
              borderRadius: "12px",
            }}>
            <Box>
              <Typography
  variant="h6"
  sx={{
    fontWeight: 700,
    color: "#1F263E",
    mb: 0.5,
    lineHeight: 1.2,
  }}>
  {t("booking.view.room")}: {selectedBooking?.roomNumber || "No Room"}
</Typography>
              <Typography
  variant="body2"
  sx={{ color: "#718096", fontWeight: 500 }}>
  {t("booking.view.bookedBy")}: {selectedBooking?.user || "Unknown User"}
</Typography>
            </Box>
          </Box>

          <Grid container spacing={3}>
            <Grid size={6}>
              <Typography
                variant="body2"
                sx={{ color: "#718096", mb: 0.5, fontWeight: 500 }}>
                {t("booking.view.startDate")}
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontWeight: 600, color: "#1F263E" }}>
               {selectedBooking?.startDate || "N/A"}
              </Typography>
            </Grid>

            <Grid size={6}>
              <Typography
                variant="body2"
                sx={{ color: "#718096", mb: 0.5, fontWeight: 500 }}>
                {t("booking.view.endDate")}
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontWeight: 600, color: "#1F263E" }}>
                {selectedBooking?.endDate || "N/A"}
              </Typography>
            </Grid>

            <Grid size={12} sx={{ mt: 1 }}>
              <Typography
                variant="body2"
                sx={{ color: "#718096", mb: 0.5, fontWeight: 500 }}>
                {t("booking.view.totalPrice")}
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "#203FC7" }}>
                {selectedBooking?.totalPrice} {t("booking.view.currency")}
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
            }}>
           {t("booking.view.close")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
