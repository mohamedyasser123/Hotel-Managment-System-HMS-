import Box from "@mui/material/Box";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";


interface SharedTableProps<T = any> {
  rows: T[];
  columns: GridColDef[];
  renderActions?: (row: T) => React.ReactNode;
}

export default function SharedTable<T>({
  rows,
  columns,
  renderActions,
}: SharedTableProps<T>) {
  const finalColumns: GridColDef[] = [
    ...columns,
    ...(renderActions
      ? [
          {
            field: "actions",
            headerName: "",
            sortable: false,
            width: 80,
            renderCell: (params: any) => renderActions?.(params.row as T),
          },
        ]
      : []),
  ];

  return (
    <Box
      sx={{
        border: "1px solid #E2E5EB",
        borderRadius: "10px",
        overflow: "hidden",
        width: "90%",
        mx: "auto",
      }}>
      <DataGrid
        rows={rows}
        columns={finalColumns}
        autoHeight
        hideFooter
        disableRowSelectionOnClick
        rowHeight={65}
        sx={{
          border: "none",

          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#E2E5EB !important",
            padding: "0 15px",
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "#E2E5EB !important",
          },

          "& .MuiDataGrid-columnHeaderTitleContainer": {
            backgroundColor: "#E2E5EB !important",
          },

          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: 600,
            color: "#1F263E",
            fontSize: "14px",
          },

          "& .MuiDataGrid-cell": {
            color: "#3A3A3D",
            borderBottom: "none",
            fontSize: "14px",
            padding: "0 25px",
          },

          "& .MuiDataGrid-row:nth-of-type(odd)": {
            backgroundColor: "#fff",
          },

          "& .MuiDataGrid-row:nth-of-type(even)": {
            backgroundColor: "#F8F9FB",
          },

          "& .MuiDataGrid-row:hover": {
            backgroundColor: "#EEF1F5 !important",
          },

          "& .MuiDataGrid-columnSeparator": {
            display: "none",
          },

          "& .MuiDataGrid-cell:focus": {
            outline: "none",
          },

          "& .MuiDataGrid-columnHeader:focus": {
            outline: "none",
          },
        }}
      />
    </Box>
  );
}
