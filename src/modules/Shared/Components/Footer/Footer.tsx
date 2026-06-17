import { Box, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        mt: 8,
        borderTop: "1px solid #E5E5E5",
        py: 6,
      }}>
      {/* 👇 نفس container بتاع الصفحة */}
      <Box
        sx={{
          width: "80%",
          margin: "0 auto",
        }}>
        <Grid container spacing={6}>
          {/* LOGO + DESCRIPTION */}
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
              We kaboom your beauty holiday instantly and memorable.
            </Typography>
          </Grid>

          {/* FOR BEGINNERS */}
          <Grid size={{ xs: 6, md: 2 }}>
            <Typography sx={{ fontWeight: 600, mb: 2, color: "#152C5B" }}>
              For Beginners
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
              New Account
            </Typography>

            <Typography sx={{ color: "#B0B0B0", mb: 1 }}>
              Start Booking
            </Typography>

            <Typography sx={{ color: "#B0B0B0" }}>Use Payments</Typography>
          </Grid>

          {/* EXPLORE US */}
          <Grid size={{ xs: 6, md: 2 }}>
            <Typography sx={{ fontWeight: 600, mb: 2, color: "#152C5B" }}>
              Explore Us
            </Typography>

            <Typography sx={{ color: "#B0B0B0", mb: 1 }}>
              Our Careers
            </Typography>

            <Typography sx={{ color: "#B0B0B0", mb: 1 }}>Privacy</Typography>

            <Typography sx={{ color: "#B0B0B0" }}>
              Terms & Conditions
            </Typography>
          </Grid>

          {/* CONTACT */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography sx={{ fontWeight: 600, mb: 2, color: "#152C5B" }}>
              Connect Us
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

        {/* COPYRIGHT */}
        <Typography
          align="center"
          sx={{
            mt: 6,
            color: "#B0B0B0",
            fontSize: 14,
          }}>
          Copyright 2026 • All rights reserved • Staycation
        </Typography>
      </Box>
    </Box>
  );
}
