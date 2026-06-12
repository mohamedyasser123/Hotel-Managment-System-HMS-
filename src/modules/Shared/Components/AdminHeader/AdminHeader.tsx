import { Avatar, Badge, Box, IconButton, Typography } from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import useAuth from '../../../../hooks/useAuth';
import { useEffect } from 'react';
export default function AdminHeader() {
    const { data,fetchProfile  } = useAuth();
    const user = data?.user;
    useEffect(() => {
    if (!data) {
      fetchProfile();
    }
  }, [data, fetchProfile]);
  return (
    <Box
  sx={{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between", 
    width: "100%",
    px: 3,
    py:3,
    height: "100%",
  }}
>
  <Typography variant="h6" sx={{ color: "#1A1B1E", fontWeight: "bold" }}>
  </Typography>

  <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
    {user ? (
          <Box 
            onClick={(e) => { }}
            sx={{ 
              display: "flex", 
              alignItems: "center", 
              gap: 1, 
              cursor: "pointer",
              "&:hover": { opacity: 0.8 } 
            }}
          >
            <Avatar 
              src={user.profileImage} 
              alt={user.userName} 
              sx={{ width: 36, height: 36 }}
            />
            
            <Typography variant="body1" sx={{ fontWeight: 500, color: "#1A1B1E" }}>
              {user.userName}
            </Typography>

            <KeyboardArrowDownIcon sx={{ color: "#777", fontSize: 20 }} />
          </Box>
        ) : (
          <Typography variant="body2" color="text.secondary">Loading profile...</Typography>
        )}
 <IconButton sx={{ color: "#1F384C" }}>
      <Badge badgeContent={4} color="error">
        <NotificationsIcon />
      </Badge>
    </IconButton>
  </Box>
</Box>
  )
}
