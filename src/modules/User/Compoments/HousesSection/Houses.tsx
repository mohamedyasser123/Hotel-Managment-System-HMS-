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
const houses = [
  {
    image: image1,
    title: "Tabby Town",
    location: "Gunung Batu, Indonesia",
  },
  {
    image: image2,
    title: "Anggana",
    location: "Bogor, Indonesia",
  },
  {
    image: image3,
    title: "Seattle Rain",
    location: "Jakarta, Indonesia",
  },
  {
    image: image4,
    title: "Woodden Pit",
    location: "Wonosobo, Indonesia",
  },
  {
    image: image5,
    title: "Garden Haven",
    location: "Bali, Indonesia",
  },
  {
    image: image6,
    title: "Blue Lagoon",
    location: "Bogor, Indonesia",
  },
  {
    image: image7,
    title: "Forest Cabin",
    location: "Wonosobo, Indonesia",
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
        Houses with beauty backyard
      </Typography>

      <Swiper
     modules={[Autoplay]}
     autoplay={{
     delay: 2500,
     disableOnInteraction: false,
     }}
  spaceBetween={20}
  slidesPerView={4}
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
      {house.title}
    </Typography>

   <Typography
  sx={{
    fontSize: "15px",
    color: "#B0B0B0",
    fontWeight: 300,
  }}
>
  {house.location}
</Typography>
  </Box>
</SwiperSlide>
  ))}
</Swiper>
    </Box>
  );
}