import usePortalAds from '../../../../../hooks/portal/usePortalAds';
import { Box, CircularProgress, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from "swiper/modules";

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
        }}
      />

      {index === 0 && (
      <Box
  sx={{
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#FF498B",
    color: "#fff",
    px: 2,
    py: 1,
    borderTopRightRadius: "16px",
    borderBottomLeftRadius: "16px",
    fontSize: "14px",
  }}
>
  <span style={{ fontWeight: 600 }}>Popular</span>{" "}
  <span style={{ fontWeight: 300 }}>Choice</span>
</Box>
      )}
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
