import { Box, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function Footer() {
    const { t } = useTranslation("user");
    return (
      <Box
        component="footer"
        sx={{
          width: "100%",
          mt: 8,
          borderTop: "1px solid #E5E5E5",
          py: 6,
        }}>
        <Box
          sx={{
            width: { xs: "92%", md: "85%" },
            maxWidth: "1750px",
            margin: "0 auto",
          }}>
          <Grid container spacing={6}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                <Box component="span" sx={{ color: "#3252DF" }}>
                  Stay
                </Box>
                <Box component="span" sx={{ color: "#152C5B" }}>
                  cation.
                </Box>
              </Typography>

              <Typography sx={{ color: "#B0B0B0", fontSize: 14 }}>
                {t("footer.description")}
              </Typography>
            </Grid>

            <Grid size={{ xs: 6, md: 2 }}>
              <Typography sx={{ fontWeight: 600, mb: 2, color: "#152C5B" }}>
                {t("footer.forBeginners")}
              </Typography>

              <Typography
                component={Link}
                to="/register"
                sx={{
                  color: "#B0B0B0",
                  textDecoration: "none",
                  display: "block",
                  mb: 1,
                }}>
                {t("footer.newAccount")}
              </Typography>

              <Typography sx={{ color: "#B0B0B0", mb: 1 }}>
                {t("footer.startBooking")}
              </Typography>

              <Typography sx={{ color: "#B0B0B0" }}>
                {t("footer.usePayments")}
              </Typography>
            </Grid>

            <Grid size={{ xs: 6, md: 2 }}>
              <Typography sx={{ fontWeight: 600, mb: 2, color: "#152C5B" }}>
                {t("footer.exploreUs")}
              </Typography>

              <Typography sx={{ color: "#B0B0B0", mb: 1 }}>
                {t("footer.ourCareers")}
              </Typography>

              <Typography sx={{ color: "#B0B0B0", mb: 1 }}>
                {t("footer.privacy")}
              </Typography>

              <Typography sx={{ color: "#B0B0B0" }}>
                {t("footer.terms")}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Typography sx={{ fontWeight: 600, mb: 2, color: "#152C5B" }}>
                {t("footer.connectUs")}
              </Typography>

              <Typography sx={{ color: "#B0B0B0", mb: 1 }}>
                support@staycation.id
              </Typography>

              <Typography sx={{ color: "#B0B0B0", mb: 1 }}>
                021 - 2208 - 1996
              </Typography>

              <Typography sx={{ color: "#B0B0B0" }}>
                Staycation, Kemang, Jakarta
              </Typography>
            </Grid>
          </Grid>

          <Typography
            align="center"
            sx={{
              mt: 6,
              color: "#B0B0B0",
              fontSize: 14,
            }}>
            {t("footer.copyright")}
          </Typography>
        </Box>
      </Box>
    );
}
