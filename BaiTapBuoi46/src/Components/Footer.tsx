import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box component="footer" sx={{ py: 3, textAlign: 'center', bgcolor: 'background.paper', mt: 'auto' }}>
      <Container>
        <Typography variant="body2" color="text.secondary">
          Bản quyền © 2026 - Vương Đức Tiến
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;