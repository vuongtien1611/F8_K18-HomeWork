import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useAppTheme } from './ThemeContext';

const Header: React.FC = () => {
  const { mode, toggleTheme } = useAppTheme();

  return (
    <AppBar position="static" color="primary" elevation={4}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            Ứng dụng Đọc Sách
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            startIcon={mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
            onClick={toggleTheme}
            sx={{ borderRadius: 20 }}
          >
            {mode === 'light' ? 'Chế độ Tối' : 'Chế độ Sáng'}
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;