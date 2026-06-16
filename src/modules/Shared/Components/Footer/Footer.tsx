import { Box, Container, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Footer() {
   return (
    <Box
      component="footer"
      
      sx={{
        mt: 8,
        py: 6,
            px: { xs: 3, md: 8, lg: 12 },

      }}
    >
     
        <Grid container spacing={12}>
          <Grid size={{xs:12, md:4,}}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, mb: 1 }}
            >
              <Box component="span" sx={{ color: "#3252DF" }}>
                Stay
              </Box>
              <Box component="span" sx={{ color: "#152C5B" }}>
                cation.
              </Box>
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{color:"#B0B0B0 "}}>
             We kaboom your beauty holiday
instantly and memorable.
            </Typography>
             <Typography variant="body2" color="text.secondary" sx={{color:"#B0B0B0 "}}>
instantly and memorable.
            </Typography>
          </Grid>

          <Grid size={{xs:6, md:2}}>
            <Typography sx={{ fontWeight: 600, mb: 2 , color:"#152C5B"}}>
              For Beginners
            </Typography>

            <Typography sx={{color:"#B0B0B0 ",    textDecoration: "none",
}} variant="body2"   component={Link}
  to="/register">New Account</Typography>
            <Typography sx={{color:"#B0B0B0 "}} variant="body2">Start Booking</Typography>
            <Typography sx={{color:"#B0B0B0 "}} variant="body2">Use Payments</Typography>
          </Grid>

          <Grid size={{xs:6, md:2}}>
            <Typography sx={{ fontWeight: 600, mb: 2,color:"#152C5B" }}>
              Explore Us
            </Typography>

            <Typography  sx={{color:"#B0B0B0 "}} variant="body2">Our Careers</Typography>
            <Typography  sx={{color:"#B0B0B0 "}} variant="body2">Privacy</Typography>
            <Typography  sx={{color:"#B0B0B0 "}} variant="body2">Terms & Conditions</Typography>
          </Grid>

          <Grid size={{xs:12, md:4}}>
            <Typography sx={{ fontWeight: 600, mb: 2,color:"#152C5B" }}>
              Connect Us
            </Typography>

            <Typography  sx={{color:"#B0B0B0 "}} variant="body2">
              support@staycation.id
            </Typography>

            <Typography  sx={{color:"#B0B0B0 "}} variant="body2">
              021 - 2208 - 1996
            </Typography>

            <Typography  sx={{color:"#B0B0B0 "}} variant="body2">
              Staycation, Kemang, Jakarta
            </Typography>
          </Grid>
        </Grid>

        <Typography
          align="center"
          color="text.secondary"
          sx={{ mt: 6 , color:"#B0B0B0 "}}
          
        >
          Copyright 2026 • All rights reserved • Staycation
        </Typography>
   
    </Box>
  );
}
