import { Box, Grid, IconButton, Rating, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation,Autoplay } from "swiper/modules";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useTranslation } from 'react-i18next';
export default function ReviewSection() {
    const { t, i18n } = useTranslation("user");
const isRTL = i18n.language === "ar";
const testimonialsData = [
  {
    id: 1,
    title: t("reviews.happyFamily"),
    rating: 5,
    text: t("reviews.happyFamilyText"),
    author: t("reviews.happyFamilyAuthor"),
    image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 2,
    title: t("reviews.amazingExperience"),
    rating: 5,
    text: t("reviews.amazingExperienceText"),
    author: t("reviews.amazingExperienceAuthor"),
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=600&auto=format&fit=crop',
  },
    {
    id: 3,
    title: t("reviews.happyFamily"),
    rating: 5,
    text: t("reviews.happyFamilyText"),
    author: t("reviews.happyFamilyAuthor"),
    image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=600&auto=format&fit=crop',
  },
   {
    id: 4,
    title: t("reviews.amazingExperience"),
    rating: 5,
    text: t("reviews.amazingExperienceText"),
    author: t("reviews.amazingExperienceAuthor"),
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=600&auto=format&fit=crop',
  },
];
return (
    <Box  sx={{ py: 8 }}>
      <Swiper
        modules={[Navigation,Autoplay]}
         key={i18n.language}
  dir={isRTL ? "rtl" : "ltr"}
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{
     delay: 2500,
     disableOnInteraction: false,
     }}
        navigation={{
          prevEl: '.custom-prev-btn',
          nextEl: '.custom-next-btn',
        }}
        style={{ width: '100%' }}
      >
        {testimonialsData.map((item) => (
          <SwiperSlide key={item.id}>
<Grid container   spacing={{ xs: 4, md: 6 }}
 sx={{ alignItems: 'center', justifyContent: 'center' }}>

<Grid size={{ xs: 12, md: 5 }} sx={{ display: 'flex', justifyContent: 'start' }}>
  <Box sx={{ position: 'relative',  width: {
        xs: "280px",
        sm: "320px",
        md: "370px",
      },
      height: {
        xs: "330px",
        sm: "380px",
        md: "416px",
      }, mt: 1 }}>
    
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
         width: "90%",
    height: "95%",
        border: '2px solid #E5E5E5', 
        borderRadius: '24px',
        zIndex: 1,
      }}
    />

    <Box
      component="img"
      src={item.image}
      alt={item.title}
      sx={{
        position: 'absolute',
         left: {
      xs: 15,
      md: 30,
    },
    top: {
      xs: 10,
      md: 16,
    },
    width: "90%",
    height: "95%",
        objectFit: 'cover',
        borderRadius: '24px 24px 100px 24px', 
        zIndex: 2,
      }}
    />

  </Box>
</Grid>

              <Grid size={{ xs: 12, md: 7 }}>
                <Box sx={{  pl: { xs: 0, md: 4 },
      textAlign: {
        xs: "center",
        md: "left",
      }, }}>
                  
                  <Typography variant="h5" sx={{ fontWeight: 600, color: '#1A2B49', mb: 2 }}>
                    {item.title}
                  </Typography>

                  <Rating value={item.rating} readOnly sx={{ color: '#FFC107', mb: 2 }} />

                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 400,
                      color: '#152C5B',
                      lineHeight: 1.5,
                      mb: 1,
                      fontSize: {
      xs: "1.3rem",
      sm: "1.6rem",
      md: "2.2rem",
    },
                    }}
                  >
                    {item.text}
                  </Typography>

                  <Typography variant="body1" sx={{ color: '#B0B0B0', mb: 4 }}>
                    {item.author}
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 2,  justifyContent: {
      xs: "center",
      md: "flex-start",
    },
    mt: {
      xs: 3,
      md: 0,
    }, }}>
                    <IconButton
                      className="custom-prev-btn"
                      sx={{
                        width: 50,
                        height: 50,
                        border: '2px solid #3252DF',
                        color: '#3252DF',
                        '&:hover': { backgroundColor: '#3252DF', color: '#FFF' },
                        '&.swiper-button-disabled': { opacity: 0.4, borderColor: '#ccc', color: '#ccc' }
                      }}
                    >
{isRTL ? <ArrowForwardIcon /> : <ArrowBackIcon />}
                    </IconButton>

                    <IconButton
                      className="custom-next-btn"
                      sx={{
                        width: 50,
                        height: 50,
                        border: '2px solid #3252DF',
                        color: '#3252DF',
                        '&:hover': { backgroundColor: '#3252DF', color: '#FFF' },
                        '&.swiper-button-disabled': { opacity: 0.4, borderColor: '#ccc', color: '#ccc' }
                      }}
                    >
                      {isRTL ? <ArrowBackIcon /> : <ArrowForwardIcon />}
                    </IconButton>
                  </Box>

                </Box>
              </Grid>

            </Grid>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
