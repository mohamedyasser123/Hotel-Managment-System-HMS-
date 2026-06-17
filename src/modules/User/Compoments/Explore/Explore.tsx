import { useSearchParams } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  IconButton,
  Grid,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import usePortalExplore from "../../../../hooks/portal/usePortalExplore";
import { Breadcrumbs, Link as MuiLink } from "@mui/material";

import { Link as RouterLink } from "react-router-dom";

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
      <Breadcrumbs separator="/" aria-label="breadcrumb" sx={{ mb: 2 }}>
        <MuiLink
          component={RouterLink}
          to="/home"
          underline="hover"
          sx={{
            color: "#B0B0B0",
            fontSize: "16px",
          }}>
          Home
        </MuiLink>

        <Typography
          sx={{
            color: "#152C5B",
            fontWeight: 500,
            fontSize: "16px",
          }}>
          Explore
        </Typography>
      </Breadcrumbs>

      <Typography
        sx={{
          color: "#152C5B",
          fontWeight: 700,
          mb: 4,
          textAlign: "center",
          fontSize: {
            xs: "28px",
            md: "36px",
          },
        }}>
        Explore All Rooms
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
              <Box
                sx={{
                  position: "relative",
                  borderRadius: "16px",
                  overflow: "hidden",
                  cursor: "pointer",
                  width: "100%",
                  height: "260px",
                  "&:hover .overlay": {
                    opacity: 1,
                  },
                  "&:hover img": {
                    transform: "scale(1.04)",
                  },
                }}>
                {/* IMAGE */}
                <Box
                  component="img"
                  src={room.images?.[0] || "/placeholder.jpg"}
                  alt={room.roomNumber}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    transition: "transform 0.5s ease",
                  }}
                />

                {/* BADGE (Price) */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    backgroundColor: "#FF4D80",
                    color: "#fff",
                    padding: "8px 24px",
                    borderBottomLeftRadius: "16px",
                    fontWeight: 500,
                    fontSize: "14px",
                    zIndex: 3,
                  }}>
                  ${room.price}{" "}
                  <Box
                    component="span"
                    sx={{ fontWeight: 300, fontSize: "12px" }}>
                    per night
                  </Box>
                </Box>

                {/* OVERLAY ICONS */}
                <Box
                  className="overlay"
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(0, 0, 0, 0.25)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 2,
                    opacity: 0,
                    transition: "0.3s ease",
                    zIndex: 2,
                  }}>
                  <IconButton sx={{ color: "#fff" }}>
                    <FavoriteIcon sx={{ fontSize: "28px" }} />
                  </IconButton>
                  <IconButton sx={{ color: "#fff" }}>
                    <VisibilityIcon sx={{ fontSize: "28px" }} />
                  </IconButton>
                </Box>

                {/* TEXT BOTTOM */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    p: 3,
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)",
                    color: "#fff",
                    zIndex: 1,
                  }}>
                  <Typography
                    sx={{ fontWeight: 600, fontSize: "19px", lineHeight: 1.2 }}>
                    Room: {room.roomNumber}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "14px",
                      opacity: 0.8,
                      mt: 0.5,
                      fontWeight: 300,
                    }}>
                    Capacity: {room.capacity}{" "}
                    {room.capacity > 1 ? "people" : "person"}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}