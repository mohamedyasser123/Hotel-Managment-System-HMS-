import { IconButton } from "@mui/material";
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
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [openViewModal, setOpenViewModal] = useState(false);

  const handleOpen = (event: React.MouseEvent<HTMLElement>, row: any) => {
    setAnchorEl(event.currentTarget);

    setSelectedBooking(row);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const rows = useMemo(() => {
    return (data ?? []).map((booking) => ({
      id: booking._id,

      _id: booking._id,

      roomNumber: booking.room.roomNumber,

      totalPrice: booking.totalPrice,

      startDate: new Date(booking.startDate).toLocaleDateString("en-GB"),

      endDate: new Date(booking.endDate).toLocaleDateString("en-GB"),

      user: booking.user.userName,
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
                    setOpenViewModal(true);

                    handleClose();
                  },
                },
              ]}
            />
          </>
        )}
      />
    </>
  );
}
