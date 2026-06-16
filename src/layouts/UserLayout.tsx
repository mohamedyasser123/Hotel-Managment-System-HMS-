import React from 'react'
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
      }}
    >
      <Navbar />

      <Box
        component="main"
        sx={{
          flex: 1,
        }}
      >
        <Outlet />
      </Box>

      <Footer />
    </Box>
  );
}
