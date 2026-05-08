import React, { useMemo } from 'react';
import { createTheme, ThemeProvider as MUIThemeProvider, CssBaseline, Box } from '@mui/material';
import { ThemeProvider, useAppTheme } from './Components/ThemeContext';
import Header from './Components/Header';
import Content from './Components/Content';
import Footer from './Components/Footer';

const AppContent: React.FC = () => {
  const { mode } = useAppTheme();

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: { main: '#1976d2' },
      background: {
        default: mode === 'light' ? '#f5f5f5' : '#121212',
      },
    },
  }), [mode]);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <Box component="main" sx={{ flex: 1, py: 4 }}>
          <Content />
        </Box>
        <Footer />
      </Box>
    </MUIThemeProvider>
  );
};

const App: React.FC = () => (
  <ThemeProvider>
    <AppContent />
  </ThemeProvider>
);

export default App;