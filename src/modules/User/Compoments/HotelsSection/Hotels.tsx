import { Box, Typography } from "@mui/material";
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
    title: "Green Park",
    location: "Tangerang, Indonesia",
  },
  {
    image: image2,
    title: "Podo Wae",
    location: "Madiun, Indonesia",
  },
  {
    image: image3,
    title: "Silver Rain",
    location: "Bandung, Indonesia",
  },
  {
    image: image4,
    title: "Cashville",
    location: "Kemang, Indonesia",
  },
  {
    image: image5,
    title: "Ocean View",
    location: "Bali, Indonesia",
  },
  {
    image: image6,
    title: "Royal Nest",
    location: "Jakarta, Indonesia",
  },
  {
    image: image7,
    title: "Golden Stay",
    location: "Bogor, Indonesia",
  },
];

export default function Houses() {
 

  return (
    <Box sx={{ py: 8 }}>
      <Typography
        sx={{
          fontSize: "24px",
          fontWeight: 500,
          color: "#152C5B",
          mb: 4,
        }}
      >
        Hotels with large living room
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
  <span style={{ fontWeight: 600 }}>Popular</span>{" "}
  <span style={{ fontWeight: 300 }}>Choice</span>
</Box>
      )}
    </Box>

    <Typography
      sx={{
        mt: 2,
        fontSize: "20px",
        fontWeight: 500,
        color: "#152C5B"
      }}
    >
      {hotel.title}
    </Typography>

   <Typography
  sx={{
    fontSize: "15px",
    color: "#B0B0B0",
    fontWeight: 300,
  }}
>
  {hotel.location}
</Typography>
  </Box>
</SwiperSlide>
  ))}
</Swiper>
    </Box>
  );
}