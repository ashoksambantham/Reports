import React from 'react';
import { Container, AppBar, Toolbar, Typography, Button } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

const Header = () => {
  return (
    <AppBar position='static' color='primary'>
      <Container>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Report Generator
          </Typography>
          {/* <Button
            variant='outlined'
            color='inherit'
            startIcon={<PictureAsPdfIcon />}
            onClick={() => globalThis.print()}
          >
            Download as PDF
          </Button> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
