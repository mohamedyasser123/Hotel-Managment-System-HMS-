import {
  Box,
  Typography,
  CircularProgress,
  IconButton,
  Grid,
  Pagination,
} from "@mui/material";
import { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { Breadcrumbs, Link as MuiLink } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import useFavorites from "../../../../hooks/portal/useFavorites";
import { removeFavorite } from "../../../../api/modules/portal/favorites";
import type { FavoriteRoom } from "../../../../types/portal/favorites";
export default function Favorites() {
  const { data, isLoading, error } = useFavorites();
  const [page, setPage] = useState(1);

console.log(data);
  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress size={50} sx={{ color: "#3252DF" }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography color="error" variant="h6">
          Something went wrong while fetching favorite rooms.
        </Typography>
      </Box>
    );
  }

 const roomsList = data?.data?.favoriteRooms?.[0]?.rooms || [];
 const size = 5;
 
const pageCount = Math.ceil(roomsList.length / size);

const startIndex = (page - 1) * size;
const endIndex = startIndex + size;

const paginatedRooms = roomsList.slice(startIndex, endIndex);

const handlePageChange = (
  _: React.ChangeEvent<unknown>,
  value: number
) => {
  setPage(value);
};
const handleRemove = async (roomId: string) => {
  try {
    const result = await removeFavorite(roomId);
    window.location.reload();
  } catch (error) {
  }
};

  return (
    <Box sx={{ 
      py: 6,
       px: {
        xs: 2,
        sm: 3,
        md: 4,
       }
        }}>
      <Breadcrumbs separator="/" aria-label="breadcrumb" sx={{ mb: 2 }}>
        <MuiLink
          component={RouterLink}
          to="/home"
          underline="hover"
          sx={{
            color: "#B0B0B0",
            fontSize: "16px",
          }}
        >
          Home
        </MuiLink>

        <Typography
          sx={{
            color: "#152C5B",
            fontWeight: 500,
            fontSize: "16px",
          }}
        >
          Favorites
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
        }}
      >
        Your Favorites
      </Typography>
{roomsList.length === 0 ? (
  <Typography
    sx={{
      color: "#B0B0B0",
      fontSize: "18px",
      textAlign: "center",
      mt: 4,
    }}
  >
    No favorite rooms found.
  </Typography>
) : (
  <>
    <Grid container spacing={4}>
      {paginatedRooms.map((room: FavoriteRoom) => (
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
            }}
          >
            <Box
              component="img"
              src={room.images?.[0] || "https://via.placeholder.com/400x300"}
              alt={room.roomNumber}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                transition: "transform 0.5s ease",
              }}
            />

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
              }}
            >
              ${room.price}
              <Box
                component="span"
                sx={{
                  fontWeight: 300,
                  fontSize: "12px",
                  ml: 1,
                }}
              >
                per night
              </Box>
            </Box>

            <Box
              className="overlay"
              sx={{
                position: "absolute",
                inset: 0,
                background: "rgba(0,0,0,0.25)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
                opacity: 0,
                transition: "0.3s ease",
                zIndex: 2,
              }}
            >
              <IconButton
                sx={{ color: "#fff" }}
                onClick={() => handleRemove(room._id)}
              >
                <FavoriteIcon sx={{ fontSize: "28px" }} />
              </IconButton>

              <IconButton sx={{ color: "#fff" }}>
                <VisibilityIcon sx={{ fontSize: "28px" }} />
              </IconButton>
            </Box>

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
              }}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "19px",
                  lineHeight: 1.2,
                }}
              >
                Room: {room.roomNumber}
              </Typography>

              <Typography
                sx={{
                  fontSize: "14px",
                  opacity: 0.8,
                  mt: 0.5,
                  fontWeight: 300,
                }}
              >
                Capacity: {room.capacity}
              </Typography>
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>

    {pageCount > 1 && (
      <Box
        sx={{
          mt: 6,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Pagination
          count={pageCount}
          page={page}
          onChange={handlePageChange}
          color="primary"
          size="large"
        />
      </Box>
    )}
  </>
)} 
    </Box>
  );
}