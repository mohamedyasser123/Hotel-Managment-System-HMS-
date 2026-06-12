import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Sidebar from '../modules/Shared/Components/Sidebar/Sidebar';
import AdminHeader from '../modules/Shared/Components/AdminHeader/AdminHeader';

export default function AdminLayout() {
  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      
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