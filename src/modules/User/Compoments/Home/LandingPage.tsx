import { Box } from '@mui/material'
import HeroSection from "./HeroSection/HeroSection";
import Houses from '../HousesSection/Houses';
import PopularAds from "./PopularAds/PopularAds";
import AdsSection from './AdsSection/AdsSection';
import ReviewSection from './ReviewSection/ReviewSection';
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
<AdsSection />
      {/* review section */}
      <ReviewSection />
    </Box>
  );
}
