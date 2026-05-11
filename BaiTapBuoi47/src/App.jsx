import React from 'react';
import { CssBaseline, ThemeProvider, createTheme, Box, Typography } from '@mui/material';
import Spreadsheet from './components/Spreadsheet';


const theme = createTheme({
  palette: {
    primary: {
      main: '#1a73e8',
    },
    background: {
      default: '#f8f9fa',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 13
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        {/* Header */}
        <Box sx={{ p: 2, bgcolor: 'white', borderBottom: '1px solid #e0e0e0' }}>
          <Typography variant="h6" component="h1" sx={{ color: '#5f6368', fontWeight: 400 }}>
            Google sheet - Clone
          </Typography>
        </Box>

        {/* Table */}
        <Box sx={{ p: 3, flexGrow: 1, overflow: 'auto' }}>
          <Spreadsheet />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;