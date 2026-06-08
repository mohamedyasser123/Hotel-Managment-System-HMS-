import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  return (
   <Box sx={{ p: 3 }}>
      <Typography variant="h4">Dashboard</Typography>
      
      <Button 
        variant="contained" 
        color="error" 
        onClick={() => navigate("/change-password")}
        sx={{ mt: 3, textTransform: "none" }}
      >
        Go to Change Password
      </Button>
    </Box>
  )
}
