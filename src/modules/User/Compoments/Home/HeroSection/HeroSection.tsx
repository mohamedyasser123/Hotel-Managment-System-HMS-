import { Box, Typography, IconButton, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import heroImg from "../../../../../assets/images/hero.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useRoomFilters from "../../../../../hooks/portal/useRoomFilters";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useTranslation } from "react-i18next";
import i18n from "../../../../../i18n";

export default function HeroSection() {
  const { t } = useTranslation();
  const isArabic = i18n.language === "ar";

  const {
    startDate,
    endDate,
    setEndDate,
    setStartDate,
    capacity,
    increase,
    decrease,
  } = useRoomFilters();

  const navigate = useNavigate();

  const handleExplore = () => {
    if (!startDate || !endDate) {
      toast.warning("Please select date range");
      return;
    }

    const start = startDate.toISOString();
    const end = endDate.toISOString();

    navigate(`/explore?startDate=${start}&endDate=${end}&capacity=${capacity}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: { xs: 8, lg: 12, xl: 16 },
        py: { xs: 8, lg: 12 },

        flexDirection: { xs: "column", md: "row" },
        textAlign: { xs: "center", md: "left" },
      }}>
      {/* LEFT */}
      <Box
        sx={{
          flex: 1,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: { xs: "center", md: "flex-start", sm: "center" },
        }}>
        <Typography
          sx={{
            fontSize: {
              xs: "30px",
              sm: "32px",
              md: "36px",
              lg: "46px",
              xl: "54px",
            },
            fontWeight: 700,
            color: "#152C5B",
            lineHeight: 1.3,
            maxWidth: { xs: "450px", lg: "580px", xl: "680px" },
            textAlign: isArabic ? "right" : "left",
          }}>
          {t("user:heroSection.title")}
        </Typography>

        <Typography
          sx={{
            color: "#B0B0B0",
            mt: 2,
            maxWidth: { xs: "420px", lg: "520px", xl: "600px" },
            lineHeight: 1.8,
            fontSize: { xs: "16px", lg: "18px" },
            textAlign: isArabic ? "right" : "left",
          }}>
          {t("user:heroSection.discription")}
        </Typography>

        {/* BOOKING */}
        <Box
          sx={{
            mt: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "center", md: "flex-start" },
            width: "100%",
          }}>
          <Typography
            sx={{
              color: "#152C5B",
              fontWeight: 600,
              mb: 1,
              fontSize: { xs: "16px", lg: "18px" },
            }}>
            {t("user:heroSection.booking")}
          </Typography>

          {/* DATE PICKER */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 2,
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              maxWidth: { xs: "100%", lg: "460px", xl: "520px" },
            }}>
            <Box sx={{ width: "100%" }}>
              <DatePicker
                label={t("user:heroSection.start date")}
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    sx: {
                      backgroundColor: "#F5F6F8",
                      borderRadius: "8px",
                      textAlign: isArabic ? "right" : "left",
                      "& .MuiInputLabel-root": {
                        right: isArabic ? 20 : "auto",
                        left: isArabic ? "auto" : 0,
                        textAlign: isArabic ? "right" : "left",
                      },
                    },
                  },
                }}
              />
            </Box>

            <Box sx={{ width: "100%" }}>
              <DatePicker
                label={t("user:heroSection.end date")}
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    sx: {
                      backgroundColor: "#F5F6F8",
                      borderRadius: "8px",
                      textAlign: isArabic ? "right" : "left",
                              "& .MuiInputLabel-root": {
          right: isArabic ? 20 : "auto",
          left: isArabic ? "auto" : 0,
          textAlign: isArabic ? "right" : "left",
        },
                    },
                  },
                }}
              />
            </Box>
          </Box>

          {/* CAPACITY */}
          <Typography
            sx={{
              color: "#152C5B",
              fontWeight: 600,
              my: 1,
              fontSize: { xs: "16px", lg: "18px" },
            }}>
            {t("user:heroSection.capacity")}
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: i18n.language === "ar" ? "row-reverse" : "row",
              alignItems: "center",
              width: { xs: "100%", md: "320px" },
              justifyContent: "center",
              borderRadius: "8px",
              overflow: "hidden",
            }}>
            <IconButton
              onClick={decrease}
              disableRipple
              sx={{
                width: "45px",
                height: "44px",
                borderRadius: 0,
                backgroundColor: "#E74C3C",
                color: "#fff",
              }}>
              <RemoveIcon />
            </IconButton>

            <Box
              sx={{
                flex: 1,
                height: "44px",
                backgroundColor: "#F5F6F8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#152C5B",
                fontWeight: 600,
                fontSize: { xs: "16px", lg: "18px" },
              }}>
              {capacity}
            </Box>

            <IconButton
              onClick={increase}
              disableRipple
              sx={{
                width: "45px",
                height: "44px",
                borderRadius: 0,
                backgroundColor: "#1ABC9C",
                color: "#fff",
              }}>
              <AddIcon />
            </IconButton>
          </Box>
          {/* BUTTON */}
          <Button
            onClick={handleExplore}
            variant="contained"
            sx={{
              mt: 4,
              width: { xs: "100%", md: "auto" },
              backgroundColor: "#3252DF",
              textTransform: "none",
              borderRadius: "8px",
              px: { xs: 8, lg: 10 },
              py: { xs: 1, lg: 1.5 },
              fontSize: { xs: "16px", lg: "18px" },
              fontWeight: 600,
            }}>
            {t("user:heroSection.explore")}
          </Button>
        </Box>
      </Box>

      {/* RIGHT IMAGE */}
      <Box
        sx={{
          flex: 1,
          display: { xs: "none", md: "flex" },
          justifyContent: "center",
        }}>
        <Box
          component="img"
          src={heroImg}
          alt="hotel"
          sx={{
            width: "100%",
            maxWidth: { md: "500px", lg: "580px", xl: "660px" },
            height: { md: "500px", lg: "580px", xl: "660px" },
            borderRadius: "24px",
          }}
        />
      </Box>
    </Box>
  );
}