import { useMemo, useState } from "react";
import { useFacilities } from "../../../../hooks/useFacilities";
import type { Facility } from "../../../../types/Facilities";
import SharedTable from "../../../Shared/Components/CustomTable/CustomTable";
import SharedPageHeader from "../../../Shared/Components/CrudHeader/CrudHeader";
import { IconButton} from "@mui/material";
import ActionsMenu from "../../../Shared/Components/CrudMenu/CrudMenu";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";


export default function FacilitiesList() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const { data } = useFacilities();

  const rows = useMemo(() => {
    return (data ?? []).map((facility: Facility) => ({
      id: facility._id,
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

  return (
    <>
      <SharedPageHeader
        title="Facilities Table Details"
        subtitle="You can check all details"
        buttonText="Add New Facilities"
      />
      <SharedTable
        rows={rows}
        columns={columns}
        renderActions={(row) => (
          <>
            <IconButton onClick={handleOpen}>
              <MoreHorizOutlinedIcon />
            </IconButton>

            <ActionsMenu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            />
          </>
        )}
      />
    </>
  );
}
