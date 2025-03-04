import React from 'react';
import { Container, AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import MyPDF from '../templates/template1';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  Image,
} from '@react-pdf/renderer';

const Header = ({ pages }) => {
  return (
    <AppBar position='static' color='primary'>
      <Container>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Report Generator
          </Typography>
          <Box>
            <PDFDownloadLink document={<MyPDF pages={pages} />} fileName='document.pdf'>
              {({ loading }) => (
                <Button
                  sx={{
                    backgroundColor: '#fff',
                    color: '#1976d2',
                    fontSize: 16,
                    fontWeight: 600,
                    borderRadius: '20px',
                    padding: '10px 15px',
                    textTransform: 'capitalize',
                  }}
                >
                  {loading ? 'Generating PDF...' : 'Download as PDF'}
                </Button>
              )}
            </PDFDownloadLink>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
