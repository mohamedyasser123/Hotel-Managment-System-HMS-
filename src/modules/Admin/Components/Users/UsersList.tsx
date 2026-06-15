import { useMemo, useState } from "react";
import { useUsers } from "../../../../hooks/useUsers";
import CrudHeader from "../../../Shared/Components/CrudHeader/CrudHeader";
import SharedTable from "../../../Shared/Components/CustomTable/CustomTable";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import ActionsMenu from "../../../Shared/Components/CrudMenu/CrudMenu";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import SharedFilter from "../../../Shared/Components/filter/filter";

export default function UsersList() {
  const { data, loading, paginationModel, setPaginationModel, totalCount } =
    useUsers();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleOpen = (event: React.MouseEvent<HTMLElement>, rowId: string) => {
    setAnchorEl(event.currentTarget);

    setSelectedRowId(rowId);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const rows = useMemo(() => {
    return (data ?? []).map((user) => ({
      id: user._id,
      userName: user.userName,
      profileImage: user.profileImage,
      email: user.email,
    }));
  }, [data]);

  const columns = [
    { field: "userName", headerName: "User Name", flex: 1 },

    {
      field: "profileImage",
      headerName: "Profile Image",
      flex: 1,
      renderCell: (params: any) => (
        <Avatar
          src={params.value}
          alt="user"
          sx={{
            width: 45,
            height: 45,
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: "10px",
          }}
        />
      ),
    },

    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
  ];

  const filteredRows = useMemo(() => {
    return rows.filter((user: any) => {
      const matchesSearch =
        !searchValue ||
        user.userName.toLowerCase().includes(searchValue.toLowerCase());

      return matchesSearch;
    });
  }, [rows, searchValue]);
  return (
    <>
      <CrudHeader
        title="Booking Table Details"
        subtitle="You can check all details"
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
                  label: "View",
                  icon: <VisibilityOutlinedIcon fontSize="small" />,
                  onClick: () => {
                    setSelectedUser(row);
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
        slotProps={{ paper: { sx: { borderRadius: "16px", p: 1 } } }}>
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
          User Details
          <Chip
            label={selectedUser?.verified ? "Verified" : "Not Verified"}
            color={selectedUser?.verified ? "success" : "error"}
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
            <Avatar
              src={selectedUser?.profileImage}
              alt={selectedUser?.userName}
              sx={{
                width: 65,
                height: 65,
                border: "2px solid #203FC7",
                boxShadow: "0px 4px 10px rgba(0,0,0,0.05)",
              }}
            />
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: "#1F263E",
                  mb: 0.5,
                  lineHeight: 1.2,
                }}>
                {selectedUser?.userName || "N/A"}
              </Typography>
            </Box>
          </Box>

          <Grid container spacing={3}>
            <Grid size={6}>
              <Typography
                variant="body2"
                sx={{ color: "#718096", mb: 0.5, fontWeight: 500 }}>
                Email Address
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 600,
                  color: "#1F263E",
                  wordBreak: "break-all",
                }}>
                {selectedUser?.email || "N/A"}
              </Typography>
            </Grid>

            <Grid size={6}>
              <Typography
                variant="body2"
                sx={{ color: "#718096", mb: 0.5, fontWeight: 500 }}>
                Phone Number
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontWeight: 600, color: "#1F263E" }}>
                {selectedUser?.phoneNumber || "N/A"}
              </Typography>
            </Grid>

            <Grid size={6}>
              <Typography
                variant="body2"
                sx={{ color: "#718096", mb: 0.5, fontWeight: 500 }}>
                Country
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 600,
                  color: "#1F263E",
                  textTransform: "capitalize",
                }}>
                {selectedUser?.country || "N/A"}
              </Typography>
            </Grid>

            <Grid size={6}>
              <Typography
                variant="body2"
                sx={{ color: "#718096", mb: 0.5, fontWeight: 500 }}>
                Joined At (Created)
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontWeight: 600, color: "#1F263E" }}>
                {selectedUser?.createdAt
                  ? new Date(selectedUser.createdAt).toLocaleDateString("en-GB")
                  : "N/A"}
              </Typography>
            </Grid>

            <Grid size={12}>
              <Typography
                variant="body2"
                sx={{ color: "#718096", mb: 0.5, fontWeight: 500 }}>
                Last Updated
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontWeight: 600, color: "#1F263E" }}>
                {selectedUser?.updatedAt
                  ? new Date(selectedUser.updatedAt).toLocaleString("en-GB")
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
