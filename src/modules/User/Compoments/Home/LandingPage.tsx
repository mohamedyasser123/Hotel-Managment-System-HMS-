import { Box } from '@mui/material'
import HeroSection from "./HeroSection/HeroSection";
import Houses from '../HousesSection/Houses';
import PopularAds from "./PopularAds/PopularAds";
export default function LandingPage() {
  return (
    <Box>
      {/* hero */}
      <HeroSection />
      {/* most pouplar */}
      <PopularAds />
      {/* house slider */}
      <Houses />
      {/* hotel slider */}

      {/* ads section */}

      {/* review section */}
    </Box>
  );
}
