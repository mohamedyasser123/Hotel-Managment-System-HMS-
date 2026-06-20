import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Sidebar from '../modules/Shared/Components/Sidebar/Sidebar';
import AdminHeader from '../modules/Shared/Components/AdminHeader/AdminHeader';
import i18n from '../i18n';

export default function AdminLayout() {
  const isArabic = i18n.language === "ar";
  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100vw',
    flexDirection:isArabic ? "row-reverse" : "row",
    overflow: 'hidden' }}>
      
      <Box component="aside" sx={{ height: '100%', flexShrink: 0 }}>
         <Sidebar /> 
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        <Box component="header" sx={{ width: '100%', flexShrink: 0 }}>
        <AdminHeader/>
        </Box>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,          
            bgcolor: '#FFFFFF',
            overflowY: 'auto',
          }}
        >
          <Outlet />
        </Box>
      </Box>

    </Box>
  );
}