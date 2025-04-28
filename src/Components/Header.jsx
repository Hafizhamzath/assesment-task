import { AppBar, Toolbar, Typography, Avatar, Box } from '@mui/material';
import '../styles/header.css';

const Header = () => {
  return (
    <AppBar position="static" className="header-appbar">
      <Toolbar className="header-toolbar">
        <Typography variant="h6" className="header-title">Admin Panel</Typography>
        <Box className="header-user">
          <Avatar alt="Admin" src="/admin.jpg" className="header-avatar" />
          <Typography variant="body1"> Admin</Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
