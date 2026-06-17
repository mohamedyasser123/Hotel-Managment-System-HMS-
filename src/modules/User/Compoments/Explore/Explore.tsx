import { useSearchParams } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
} from "@mui/material";
import usePortalExplore from "../../../../hooks/portal/usePortalExplore";
import Grid from "@mui/material/Grid";

export default function ExploreComponent() {
  const [searchParams] = useSearchParams();

  const startDate = searchParams.get("startDate") || undefined;
  const endDate = searchParams.get("endDate") || undefined;
  const capacity = searchParams.get("capacity")
    ? Number(searchParams.get("capacity"))
    : undefined;

  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const size = searchParams.get("size") ? Number(searchParams.get("size")) : 10;

  const { data, isLoading, error } = usePortalExplore({
    startDate,
    endDate,
    capacity,
    page,
    size,
  });

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}>
        <CircularProgress size={50} sx={{ color: "#3252DF" }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography color="error" variant="h6">
          Something went wrong while fetching rooms. Please try again.
        </Typography>
      </Box>
    );
  }

  const roomsList = data?.data?.rooms || [];

  return (
    <Box sx={{ py: 6, px: 4 }}>
      <Typography
        variant="h4"
        sx={{ color: "#152C5B", fontWeight: 700, mb: 4 }}>
        Available Rooms For You
      </Typography>

      {roomsList.length === 0 ? (
        <Typography
          sx={{
            color: "#B0B0B0",
            fontSize: "18px",
            textAlign: "center",
            mt: 4,
          }}>
          No rooms available matching your select criteria. Try changing dates
          or capacity.
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {roomsList.map((room: any) => (
            <Grid key={room._id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card
                sx={{
                  borderRadius: "16px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                }}>
                {room.images?.[0] && (
                  <Box
                    component="img"
                    src={room.images[0]}
                    alt={room.roomNumber}
                    sx={{ width: "100%", height: "200px", objectFit: "cover" }}
                  />
                )}
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ color: "#152C5B", fontWeight: 600 }}>
                    Room: {room.roomNumber}
                  </Typography>
                  <Typography sx={{ color: "#B0B0B0", mt: 1 }}>
                    Capacity: {room.capacity}{" "}
                    {room.capacity > 1 ? "people" : "person"}
                  </Typography>
                  <Typography sx={{ color: "#3252DF", fontWeight: 700, mt: 1 }}>
                    ${room.price} / night
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
