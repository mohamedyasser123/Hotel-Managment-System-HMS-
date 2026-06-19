import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import image1 from "../../../../assets/images/Rectangle 3 (4).png";
import image2 from "../../../../assets/images/Rectangle 3 (5).png";
import image3 from "../../../../assets/images/Rectangle 3 (6).png";
import image4 from "../../../../assets/images/Rectangle 3 (7).png";
import image5 from "../../../../assets/images/image4.jpeg";
import image6 from "../../../../assets/images/image5.jpeg";
import image7 from "../../../../assets/images/image6.jpeg";
import { Autoplay } from "swiper/modules";
const hotels = [
  {
    image: image1,
    title: "hotels.hotel1",
    location: "hotels.location1",
  },
  {
    image: image2,
    title: "hotels.hotel2",
    location: "hotels.location2",
  },
  {
    image: image3,
    title: "hotels.hotel3",
    location: "hotels.location3",
  },
  {
    image: image4,
    title: "hotels.hotel4",
    location: "hotels.location4",
  },
  {
    image: image5,
    title: "hotels.hotel5",
    location: "hotels.location5",
  },
  {
    image: image6,
    title: "hotels.hotel6",
    location: "hotels.location6",
  },
  {
    image: image7,
    title: "hotels.hotel7",
    location: "hotels.location7",
  },
];

export default function Houses() {
 const { t } = useTranslation("user");

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
       {t("hotels.title")}
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
>

  {hotels.map((hotel, index) => (
    <SwiperSlide key={index}>
  <Box>
    <Box
      sx={{
        position: "relative",
      }}
    >
      <Box
        component="img"
        src={hotel.image}
        alt={hotel.title}
        sx={{
          width: "100%",
          height: "180px",
          objectFit: "cover",
          borderRadius: "16px",
        }}
      />

      {index === 3 && (
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
  <span style={{ fontWeight: 600 }}>
  {t("hotels.popular")}
</span>{" "}
<span style={{ fontWeight: 300 }}>
  {t("hotels.choice")}
</span>
</Box>
      )}
    </Box>

    <Typography
      sx={{
        mt: 2,
        fontSize: {
         xs: "16px",
         md: "20px",
        },
        fontWeight: 500,
        color: "#152C5B"
      }}
    >
     {t(hotel.title)}
    </Typography>

   <Typography
  sx={{
    fontSize: {
  xs: "13px",
  md: "15px",
},
    color: "#B0B0B0",
    fontWeight: 300,
  }}
>
 {t(hotel.location)}
</Typography>
  </Box>
</SwiperSlide>
  ))}
</Swiper>
    </Box>
  );
}