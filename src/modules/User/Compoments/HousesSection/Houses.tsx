import { Box, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import image1 from "../../../../assets/images/Rectangle 3.png";
import image2 from "../../../../assets/images/Rectangle 3 (1).png";
import image3 from "../../../../assets/images/Rectangle 3 (2).png";
import image4 from "../../../../assets/images/Rectangle 3 (3).png";
import image5 from "../../../../assets/images/image1.jpeg";
import image6 from "../../../../assets/images/image2.jpeg";
import image7 from "../../../../assets/images/image3.jpeg";
import { Autoplay } from "swiper/modules";
import { useTranslation } from "react-i18next";
const houses = [
  {
    image: image1,
    title: "houses.house1",
    location: "houses.location1",
  },
  {
    image: image2,
    title: "houses.house2",
    location: "houses.location2",
  },
  {
    image: image3,
    title: "houses.house3",
    location: "houses.location3",
  },
  {
    image: image4,
    title: "houses.house4",
    location: "houses.location4",
  },
  {
    image: image5,
    title: "houses.house5",
    location: "houses.location5",
  },
  {
    image: image6,
    title: "houses.house6",
    location: "houses.location6",
  },
  {
    image: image7,
    title: "houses.house7",
    location: "houses.location7",
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
        {t("houses.title")}
      </Typography>

      <Swiper
     modules={[Autoplay]}
     autoplay={{
     delay: 2500,
     disableOnInteraction: false,
     }}
  spaceBetween={20}
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

  {houses.map((house, index) => (
    <SwiperSlide key={index}>
  <Box>
    <Box
      sx={{
        position: "relative",
      }}
    >
      <Box
        component="img"
        src={house.image}
        alt={house.title}
        sx={{
          width: "100%",
          height: "180px",
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
  <span style={{ fontWeight: 600 }}>{t("houses.popular")}</span>{" "}
  <span style={{ fontWeight: 300 }}>{t("houses.choice")}</span>
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
      {t(house.title)}
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
  {t(house.location)}
</Typography>
  </Box>
</SwiperSlide>
  ))}
</Swiper>
    </Box>
  );
}