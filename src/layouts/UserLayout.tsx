import Navbar from '../modules/Shared/Components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../modules/Shared/Components/Footer/Footer'
import { Box } from '@mui/material';

export default function UserLayout() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        width: "100%", 
      }}>
      <Navbar />

      <Box
        sx={{
          width: "80%", 
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          flex: 1,
          maxWidth: "1700px", 
        }}>
        <Box sx={{ flex: 1, width: "100%", py: 4 }}>
          <Outlet />
        </Box>
      </Box>

      <Footer />
    </Box>
  );
}