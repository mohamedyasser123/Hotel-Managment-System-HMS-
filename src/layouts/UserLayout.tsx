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
        alignItems: "center",
      }}>
      <Navbar />
      <Box sx={{ width: "80%", margin: "0 auto", flex: 1 }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}
