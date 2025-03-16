import { Box } from '@mui/material';
import { Outlet } from 'react-router';

export const Layout = () => {
  return (
    <Box component="main" display="flex" flexDirection="column" height="100%">
      <Outlet />
    </Box>
  );
};
