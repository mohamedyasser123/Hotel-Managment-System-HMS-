import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  IconButton,
  Grid,
  Pagination,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import usePortalExplore from "../../../../hooks/portal/usePortalExplore";
import { Breadcrumbs, Link as MuiLink } from "@mui/material";

import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuthContext } from "../../../../context/AuthContext";
import { useState } from "react";
import { addFavorite, removeFavorite } from "../../../../api/modules/portal/favorites";
import { toast } from "react-toastify";
import { Dialog, DialogContent, DialogActions, Button } from "@mui/material";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import { addNotification } from "../../../../uitiltes/notification";
export default function ExploreComponent() {
  const [searchParams, setSearchParams] = useSearchParams();

  const startDate = searchParams.get("startDate") || undefined;
  const endDate = searchParams.get("endDate") || undefined;
  const capacity = searchParams.get("capacity")
    ? Number(searchParams.get("capacity"))
    : undefined;
    const navigate=useNavigate()
  const { t, i18n } = useTranslation("user");
  const isRTL = i18n.language === "ar";
  const page =
    searchParams.get("page")
      ? Number(searchParams.get("page"))
      : 1; const size = searchParams.get("size") ? Number(searchParams.get("size")) : 10;

  const { data, isLoading, error } = usePortalExplore({
    startDate,
    endDate,
    capacity,
    page,
    size,
  });
  const pageCount = Math.ceil((data?.data?.totalCount || 0) / size); const handlePageChange = (
    _: React.ChangeEvent<unknown>,
    value: number
  ) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", value.toString());

    setSearchParams(params);
  };
  const { loginData } = useAuthContext();
    
      const [favoriteRooms, setFavoriteRooms] = useState<string[]>([]);
      const [openLoginModal, setOpenLoginModal] = useState(false);
    const handleFavorite = async (
  e: React.MouseEvent,
  roomId: string,
  roomNumber: number) => {
        e.stopPropagation();
    
        if (!loginData) {
          setOpenLoginModal(true);
          return;
        }
    
        try {
          const isFavorite = favoriteRooms.includes(roomId);
         if (isFavorite) {
  setFavoriteRooms((prev) =>
    prev.filter((id) => id !== roomId)
  );

  await removeFavorite(roomId);

  addNotification(
    "Removed From Favorites",
    `Room ${roomNumber} removed successfully`
  );

  toast.success(
    "Successfully removed from favorites"
  );
} else {
  setFavoriteRooms((prev) => [
    ...prev,
    roomId,
  ]);

  await addFavorite(roomId);

  addNotification(
    "Added To Favorites",
    `Room ${roomNumber} added successfully`
  );

  toast.success(
    "Added to favorites"
  );

          }
        } catch (error: any) {
          toast.error(error?.response?.data?.message || "Something went wrong");
        }
      };
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
          {t("explorePage.errorFetching", "Something went wrong while fetching rooms. Please try again.")}
        </Typography>
      </Box>
    );
  }

  const roomsList = data?.data?.rooms || [];

  return (
    <Box sx={{ py: 6, px: 4 }} dir={isRTL ? "rtl" : "ltr"}>
      <Breadcrumbs separator="/" aria-label="breadcrumb" sx={{ mb: 2 }}>
        <MuiLink
          component={RouterLink}
          to="/home"
          underline="hover"
          sx={{
            color: "#B0B0B0",
            fontSize: "16px",
          }}>
          {t("navbar.home")}
        </MuiLink>

        <Typography
          sx={{
            color: "#152C5B",
            fontWeight: 500,
            fontSize: "16px",
          }}>
          {t("navbar.explore")}
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
        {t("explorePage.title", "Explore All Rooms")}      </Typography>

      {roomsList.length === 0 ? (
        <Typography
          sx={{
            color: "#B0B0B0",
            fontSize: "18px",
            textAlign: "center",
            mt: 4,
          }}>
          {t("explorePage.noRooms", "No rooms available matching your select criteria. Try changing dates or capacity.")}
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
                    right: isRTL ? "auto" : 0,
                    left: isRTL ? 0 : "auto",
                    borderBottomLeftRadius: isRTL ? 0 : "16px",
                    borderBottomRightRadius: isRTL ? "16px" : 0,
                    backgroundColor: "#FF4D80",
                    color: "#fff",
                    padding: "8px 24px",
                    fontWeight: 500,
                    fontSize: "14px",
                    zIndex: 3,
                  }}>
                  ${room.price}{" "}
                  <Box
                    component="span"
                    sx={{ fontWeight: 300, fontSize: "12px" }}>
                    {t("explorePage.perNight", "per night")}
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
                  <IconButton sx={{ color: "#fff" }} onClick={(e) =>  handleFavorite(
    e,
    room._id,
    room.roomNumber
  )}
>
                    <FavoriteIcon sx={{ fontSize: "28px" }} />
                  </IconButton>
                  <IconButton sx={{ color: "#fff" }}>
                    <VisibilityIcon  onClick={() => navigate(`/detailes/${room._id}`)} sx={{ fontSize: "28px" }} />
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
                    {t("room")}: {room.roomNumber}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "14px",
                      opacity: 0.8,
                      mt: 0.5,
                      fontWeight: 300,
                    }}>
                    {t("explorePage.capacity", "Capacity")}: {room.capacity}{" "}
                    {room.capacity > 1 ? t("explorePage.people", "people") : t("explorePage.person", "person")}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
      {pageCount > 1 && (
        <Box
          sx={{
            mt: 6,
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Pagination
            count={pageCount}
            page={page}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
            color="primary"
            size="large"
    sx={{
      "& button[aria-label*='page'], & button[aria-label*='Go to']": {
      },
      "& button:not([aria-label*='page']):not([aria-label*='Go to']) svg": {
        transform: isRTL ? "rotate(180deg)" : "none",
      },
    }}
          />
        </Box>
      )}
  <Dialog
        open={openLoginModal}
        onClose={() => setOpenLoginModal(false)}
        maxWidth="xs"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "24px",
            padding: "16px",
            boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.08)",
          },
        }}>
        <DialogContent sx={{ pb: 1 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              mt: 2,
            }}>
            <Box
              sx={{
                width: "70px",
                height: "70px",
                borderRadius: "50%",
                backgroundColor: "#f5a52344",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mb: 3,
                border: "1px solid #f5a52344",
              }}>
              <ReportProblemOutlinedIcon
                sx={{ fontSize: "35px", color: "#F5A623" }}
              />{" "}
            </Box>

            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: "#000",
                mb: 1.5,
                fontSize: "22px",
              }}>
              Login Required
            </Typography>

            <Typography
              sx={{
                color: "#B0B0B0", 
                fontSize: "15px",
                lineHeight: 1.6,
                maxWidth: "85%",
              }}>
              You need to login first to unlock full access and add this room to
              your favorites.
            </Typography>
          </Box>
        </DialogContent>

        <DialogActions
          sx={{
            justifyContent: "center",
            gap: 2,
            px: 3,
            pb: 3,
            pt: 2,
          }}>

          <Button
            variant="contained"
            onClick={() => {
              setOpenLoginModal(false);
            }}
            sx={{
              backgroundColor: "#3252DF", 
              color: "#fff",
              fontWeight: 600,
              px: 5,
              py: 1.2,
              borderRadius: "12px",
              textTransform: "none",
              boxShadow: "0px 4px 12px rgba(50, 82, 223, 0.24)",
              "&:hover": {
                backgroundColor: "#2943B7",
                boxShadow: "0px 6px 16px rgba(50, 82, 223, 0.35)",
              },
            }}>
           Ok
          </Button>
        </DialogActions>
      </Dialog>
    
    </Box>
  );
}