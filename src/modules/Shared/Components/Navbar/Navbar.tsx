import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
     <AppBar position="static" color="inherit" elevation={1}>
      <Toolbar>
        {/* Logo */}
        <Typography

          variant="h6"
          sx={{ flexGrow: 1, fontWeight: 700 }}
        >
          Logo
        </Typography>

        {/* Links */}
        <Box sx={{ display: "flex", gap: 2 }}>
        <Button component={Link} to="/home">
  Home
</Button>

<Button component={Link} to="/home/explpore">
  Explore
</Button>

<Button >
  Reviews 
</Button>
<Button component={Link} to="/home/favorites">
  Favorites
</Button>


        </Box>
      </Toolbar>
    </AppBar>
  )
}
