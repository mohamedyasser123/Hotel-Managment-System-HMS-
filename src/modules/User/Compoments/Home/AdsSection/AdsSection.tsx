import usePortalAds from '../../../../../hooks/portal/usePortalAds';
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, IconButton, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from "swiper/modules";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { addFavorite, removeFavorite } from '../../../../../api/modules/portal/favorites';
import { useAuthContext } from '../../../../../context/AuthContext';
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
export default function AdsSection() {
    const { ads, loading, error } = usePortalAds();
    const { t } = useTranslation("user");
    const { i18n } = useTranslation();
    const navigate= useNavigate()
    const isRTL = i18n.language === "ar";
      const { loginData } = useAuthContext();
    
      const [favoriteRooms, setFavoriteRooms] = useState<string[]>([]);
      const [openLoginModal, setOpenLoginModal] = useState(false);
     const handleFavorite = async (e: React.MouseEvent, roomId: string) => {
        e.stopPropagation();
    
        if (!loginData) {
          setOpenLoginModal(true);
          return;
        }
    
        try {
          const isFavorite = favoriteRooms.includes(roomId);
          if (isFavorite) {
            setFavoriteRooms((prev) => prev.filter((id) => id !== roomId));
            await removeFavorite(roomId);
            toast.success("Successfully removed from favorites");
          } else {
            setFavoriteRooms((prev) => [...prev, roomId]);
            await addFavorite(roomId);
            toast.success("Successfully added to favorites");
          }
        } catch (error: any) {
          toast.error(error?.response?.data?.message || "Something went wrong");
        }
      };
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

    if (error)
        return (
            <Typography sx={{ textAlign: "center", py: 5, color: "error.main" }}>
                Error loading ads
            </Typography>
        );

    return (
        <Box sx={{ py: 8 }}>
            <Typography
                sx={{
                    fontSize: {
                        xs: "20px",
                        md: "24px",
                    },
                    fontWeight: 500,
                    color: "#152C5B",
                    mb: 4,
                }}
            >
                {t("ads")}
            </Typography>
            <Swiper
                modules={[Autoplay]}
                  dir={isRTL ? "rtl" : "ltr"}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                spaceBetween={20}
                slidesPerView={4}
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                    },
                    600: {
                        slidesPerView: 2,
                    },
                    900: {
                        slidesPerView: 3,
                    },
                    1200: {
                        slidesPerView: 4,
                    },
                }}
                style={{ paddingLeft: 0 }}
            >
                {ads?.map((ad, index) => (
                    <SwiperSlide key={index}>
                        <Box>
                            <Box
                                sx={{
                                    position: "relative",
                                    overflow: "hidden",
                                    borderRadius: "16px",

                                    "&:hover .overlay": {
                                        opacity: 1,
                                    },

                                    "&:hover img": {
                                        transform: "scale(1.05)",
                                    },
                                }}
                            >
                                <Box
                                    component="img"
                                    src={ad.room.images?.[0] || "/placeholder.jpg"}
                                    alt={ad.room.roomNumber}
                                    sx={{
                                        width: "100%",
                                        height: {
                                            xs: 220,
                                            sm: 200,
                                            md: 180,
                                        },
                                        objectFit: "cover",
                                        borderRadius: "16px",
                                        transition: "transform 0.5s ease",
                                    }}
                                />

                                <Box
                                    className="overlay"
                                    sx={{
                                        position: "absolute",
                                        inset: 0,
                                        background: "rgba(0,0,0,0.3)",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        gap: 2,
                                        opacity: 0,
                                        transition: "opacity 0.3s ease",
                                        zIndex: 2,
                                    }}
                                >
                                    <IconButton sx={{ color: "#fff" }} onClick={(e) => handleFavorite(e, ad.room._id)}
>
                                        <FavoriteIcon />
                                    </IconButton>

                                    <IconButton onClick={() => navigate(`/detailes/${ad.room._id}`)} sx={{ color: "#fff" }}>
                                        <VisibilityIcon />
                                    </IconButton>
                                </Box>
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
                                    {ad.room?.discount}{" % "}
                                    <Box
                                        component="span"
                                        sx={{ fontWeight: 300, fontSize: "12px" }}>
                                        {t("off")}
                                    </Box>
                                </Box>
                            </Box>

                            <Typography
                                sx={{
                                    mt: 2,
                                    fontSize: {
                                        xs: "18px",
                                        md: "20px",
                                    },
                                    fontWeight: 500,
                                    color: "#152C5B"
                                }}
                            >
                               {ad.room.roomNumber
  ? `${t("room")} ${ad.room.roomNumber}`
  : "Ocean Land"}
                            </Typography>

                            <Typography
                                sx={{
                                    fontSize: "15px",
                                    color: "#B0B0B0",
                                    fontWeight: 300,
                                }}
                            >
                                {t("location")}</Typography>
                        </Box>
                    </SwiperSlide>
                ))}


            </Swiper>
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
    )
}
