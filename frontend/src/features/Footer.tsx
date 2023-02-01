import React from 'react';
import { AppBar, Box, Container, Toolbar } from '@mui/material';

function Footer(): JSX.Element {
  return (
    <div style={{ flex: '0 0 auto' }}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Container>
            <Toolbar sx={{ padding: '20px 0' }}></Toolbar>
          </Container>
        </AppBar>
      </Box>
    </div>
  );
}

export default Footer;
