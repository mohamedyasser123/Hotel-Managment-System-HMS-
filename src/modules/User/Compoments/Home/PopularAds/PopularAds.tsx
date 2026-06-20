import usePortalAds from "../../../../../hooks/portal/usePortalAds";
import { Box, Typography, IconButton, CircularProgress } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../../../../../i18n";
import {
  addFavorite,
  removeFavorite,
} from "../../../../../api/modules/portal/favorites";
import { toast } from "react-toastify";
import { useAuthContext } from "../../../../../context/AuthContext";
import { useState } from "react";
import { Dialog, DialogContent, DialogActions, Button } from "@mui/material";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import { addNotification } from "../../../../../uitiltes/notification";
export default function PopularAds() {
  const { ads, loading } = usePortalAds();
  const isArabic = i18n.language === "ar";

  const navigate = useNavigate();
  const { t } = useTranslation("user");
  const { loginData } = useAuthContext();
  const [favoriteRooms, setFavoriteRooms] = useState<string[]>([]);
  const [openLoginModal, setOpenLoginModal] = useState(false);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "40vh",
          width: "100%",
        }}>
        <CircularProgress size={50} sx={{ color: "#3252DF" }} />
      </Box>
    );
  }

  const featuredAds = ads?.slice(0, 5) || [];
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
  return (
    <>
      {" "}
      <Box sx={{ py: 3, pr: { xs: 0, md: 4 } }}>
        <Typography
          variant="h5"
          sx={{ color: "#152C5B", fontWeight: 700, mb: 3, fontSize: "24px" }}>
          {t("popAds.title")}
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "1.4fr 2fr 2fr",
            },
            gridAutoRows: {
              xs: "280px",
              md: "270px",
            },
            gap: 2,
            width: "100%",
          }}>
          {featuredAds.map((ad, index) => {
            let gridStyles = {};

            if (index === 0) {
              gridStyles = {
                gridColumn: { xs: "auto", md: "1" },
                gridRow: { xs: "auto", md: "span 2" },
                height: "100%",
                width: "100%",
              };
            } else {
              gridStyles = {
                gridColumn: "auto",
                gridRow: "auto",
                height: "100%",
                width: "100%",
                maxWidth: "100%",
              };
            }

            return (
              <Box
                key={ad._id}
                sx={{
                  position: "relative",
                  borderRadius: "16px",
                  overflow: "hidden",
                  cursor: "pointer",
                  "&:hover .overlay": {
                    opacity: 1,
                  },
                  "&:hover img": {
                    transform: "scale(1.04)",
                  },
                  ...gridStyles,
                }}>
                {/* IMAGE */}
                <Box
                  component="img"
                  src={ad.room.images?.[0] || "/placeholder.jpg"}
                  alt={ad.room.roomNumber}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    transition: "transform 0.5s ease",
                  }}
                />

                {/* BADGE */}
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
                    textAlign: isArabic ? "right" : "left",
                  }}>
                  ${ad.room.price}{" "}
                  <Box
                    component="span"
                    sx={{ fontWeight: 300, fontSize: "12px" }}>
                    {t("popAds.badge")}
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
                  <IconButton
                    onClick={(e) =>  handleFavorite(
    e,
   ad.room._id,
    Number(ad.room?.roomNumber)
  )}
                    sx={{
                      backgroundColor: "rgba(255,255,255,0.2)",
                      "&:hover": {
                        backgroundColor: "rgba(255,255,255,0.4)",
                      },
                    }}>
                    <FavoriteIcon
                      sx={{
                        fontSize: "28px",
                        color: "#fff",
                      }}
                    />
                  </IconButton>
                  <IconButton
                    onClick={() => navigate(`/detailes/${ad.room._id}`)}
                    sx={{ color: "#fff" }}>
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
                    textAlign: isArabic ? "right" : "left",
                  }}>
                  <Typography
                    sx={{ fontWeight: 600, fontSize: "19px", lineHeight: 1.2 }}>
                    {ad.room.roomNumber
                      ? `${t("popAds.room")} ${ad.room.roomNumber}`
                      : "Ocean Land"}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "14px",
                      opacity: 0.8,
                      mt: 0.5,
                      fontWeight: 300,
                    }}>
                    {t("popAds.country")}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
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
    </>
  );
}