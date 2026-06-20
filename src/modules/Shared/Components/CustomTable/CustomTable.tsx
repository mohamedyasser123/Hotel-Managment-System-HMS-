import Box from "@mui/material/Box";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import {
  useMediaQuery,
  useTheme,
  Card,
  CardContent,
  Typography,
  Stack,
  TablePagination,
  Skeleton,
} from "@mui/material";

interface SharedTableProps<T = any> {
  rows: T[];
  columns: GridColDef[];
  renderActions?: (row: T) => React.ReactNode;
  loading?: boolean;
  paginationModel?: {
    page: number;
    pageSize: number;
  };
  onPaginationModelChange?: (model: any) => void;
  totalCount?: number;
}

export default function SharedTable<T>({
  rows,
  columns,
  renderActions,
  loading,
  paginationModel = { page: 0, pageSize: 5 },
  onPaginationModelChange,
  totalCount = 0,
}: SharedTableProps<T>) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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

  if (isMobile) {
    return (
      <Box sx={{ width: "100%" }}>
        <Stack spacing={2}>
          {loading ? (
            Array.from({ length: paginationModel.pageSize }).map((_, index) => (
              <Box key={index} sx={{ width: "100%", p: 1 }}>
                <Stack spacing={1.5}>
                  <Skeleton
                    variant="rectangular"
                    animation="pulse"
                    sx={{
                      width: "100%",
                      height: 120,
                      borderRadius: "14px",
                      background:
                        "linear-gradient(135deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.02) 50%, rgba(0, 0, 0, 0.07) 100%)",
                      boxShadow: "inset 0 0 12px rgba(255, 255, 255, 0.6)",
                    }}
                  />
                  <Skeleton
                    variant="rectangular"
                    animation="pulse"
                    sx={{
                      width: "60%",
                      height: 20,
                      borderRadius: "6px",
                      background:
                        "linear-gradient(135deg, rgba(0, 0, 0, 0.04) 0%, rgba(0, 0, 0, 0.02) 100%)",
                    }}
                  />
                </Stack>
              </Box>
            ))
          ) : rows.length === 0 ? (
            <Typography align="center" sx={{ py: 4, color: "#B0B0B0" }}>
              No data available
            </Typography>
          ) : (
            rows.map((row: any, rowIndex) => (
              <Card
                key={row.id || rowIndex}
                sx={{
                  borderRadius: "14px",
                  border: "1px solid #E2E5EB",
                  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.04)",
                }}>
                <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                  <Stack spacing={1.5}>
                    {columns.map((col) => (
                      <Box
                        key={col.field}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          borderBottom: "1px dashed #F0F2F5",
                          pb: 1,
                        }}>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 600, color: "#1F263E" }}>
                          {col.headerName || col.field}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#3A3A3D" }}>
                          {col.renderCell
                            ? col.renderCell({
                                row,
                                value: row[col.field],
                              } as any)
                            : row[col.field]}
                        </Typography>
                      </Box>
                    ))}
                    {renderActions && (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          pt: 1,
                        }}>
                        {renderActions(row)}
                      </Box>
                    )}
                  </Stack>
                </CardContent>
              </Card>
            ))
          )}
        </Stack>

        {!loading && totalCount > paginationModel.pageSize && (
          <TablePagination
            component="div"
            count={totalCount}
            page={paginationModel.page}
            onPageChange={(_, newPage) =>
              onPaginationModelChange?.({ ...paginationModel, page: newPage })
            }
            rowsPerPage={paginationModel.pageSize}
            onRowsPerPageChange={(e) =>
              onPaginationModelChange?.({
                page: 0,
                pageSize: parseInt(e.target.value, 10),
              })
            }
            rowsPerPageOptions={[5, 10, 20]}
            sx={{ mt: 2, borderTop: "1px solid #E2E5EB" }}
          />
        )}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        border: "1px solid #E2E5EB",
        borderRadius: "10px",
        overflow: "hidden",
      }}>
      <DataGrid
        rows={rows}
        columns={finalColumns}
        autoHeight
        rowCount={totalCount}
        loading={loading}
        paginationMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={onPaginationModelChange}
        pageSizeOptions={[10, 20, 50]}
        hideFooter={totalCount <= paginationModel.pageSize}
        slotProps={{
          loadingOverlay: {
            variant: "circular-progress",
            noRowsVariant: "circular-progress",
          },
        }}
        disableRowSelectionOnClick
        rowHeight={65}
        sx={{
          minHeight: 400,
          border: "none",
          "& .MuiCircularProgress-root": { marginTop: "150px" },
          "& .MuiDataGrid-loadingOverlay": {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
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
          "& .MuiDataGrid-row:nth-of-type(odd)": { backgroundColor: "#fff" },
          "& .MuiDataGrid-row:nth-of-type(even)": {
            backgroundColor: "#F8F9FB",
          },
          "& .MuiDataGrid-row:hover": { backgroundColor: "#EEF1F5 !important" },
          "& .MuiDataGrid-columnSeparator": { display: "none" },
          "& .MuiDataGrid-cell:focus": { outline: "none" },
          "& .MuiDataGrid-columnHeader:focus": { outline: "none" },
        }}
      />
    </Box>
  );
}
