import usePortalAds from "../../../../../hooks/portal/usePortalAds";
import { Box, Typography, IconButton, CircularProgress } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../../../../../i18n";

export default function PopularAds() {
  const { ads, loading } = usePortalAds();
  const isArabic = i18n.language === "ar";

  const navigate = useNavigate();
  const { t } = useTranslation("user");

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

  return (
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
                <IconButton sx={{ color: "#fff" }}>
                  <FavoriteIcon sx={{ fontSize: "28px" }} />
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
  );
}