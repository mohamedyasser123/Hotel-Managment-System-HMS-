import usePortalAds from '../../../../../hooks/portal/usePortalAds';
import { Box, CircularProgress, IconButton, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from "swiper/modules";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
export default function AdsSection() {
    const { ads, loading, error } = usePortalAds();
    console.log(ads);
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
                Ads
            </Typography>
            <Swiper
                modules={[Autoplay]}
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
                                    <IconButton sx={{ color: "#fff" }}>
                                        <FavoriteIcon />
                                    </IconButton>

                                    <IconButton sx={{ color: "#fff" }}>
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
                                        OFF
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
                                    ? `Room ${ad.room.roomNumber}`
                                    : "Ocean Land"}
                            </Typography>

                            <Typography
                                sx={{
                                    fontSize: "15px",
                                    color: "#B0B0B0",
                                    fontWeight: 300,
                                }}
                            >
                                Bandung, Indonesia</Typography>
                        </Box>
                    </SwiperSlide>
                ))}


            </Swiper>



        </Box>
    )
}
