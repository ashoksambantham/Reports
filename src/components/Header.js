import React, { useState } from 'react';
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
import axios from 'axios';
const Header = ({}) => {
  const [pages, setPages] = useState([
    `<div style="display: flex; flex-wrap: wrap; height: 100%;"><div style="width: 100%;"><div style="border: 1px solid rgb(221, 221, 221); min-height: 150px; background-color: rgb(255, 255, 255); height: 100%; display: flex; align-items: stretch;"><div style="width: 100%; height: 100%;"><img src="https://www.elgi.com/eu/wp-content/uploads/2024/08/EQ-ELGi-Quest-Series-730x523-1.png" alt="Placeholder" style="width:100%;"></div></div></div><div style="width: 50%;"><div style="border: 1px solid rgb(221, 221, 221); min-height: 150px; background-color: rgb(255, 255, 255); height: 100%; display: flex; align-items: stretch;"></div></div><div style="width: 50%;"><div style="border: 1px solid rgb(221, 221, 221); min-height: 150px; background-color: rgb(255, 255, 255); height: 100%; display: flex; align-items: stretch;"><div style="width: 100%; height: 100%;"><table border="1" style="width:100%; border-collapse: collapse; border:1px solid red">
      <tbody><tr><th>Header 1</th><th>Header 2</th><th>Header 3</th><th>Header 4</th></tr>
      <tr><td>Data 1</td><td>Data 2</td><td>Data 3</td><td>Data 4</td></tr>
    </tbody></table></div></div></div><div style="width: 50%;"><div style="border: 1px solid rgb(221, 221, 221); min-height: 150px; background-color: rgb(255, 255, 255); height: 100%; display: flex; align-items: stretch;"></div></div><div style="width: 50%;"><div style="border: 1px solid rgb(221, 221, 221); min-height: 150px; background-color: rgb(255, 255, 255); height: 100%; display: flex; align-items: stretch;"></div></div><div style="width: 50%;"><div style="border: 1px solid rgb(221, 221, 221); min-height: 150px; background-color: rgb(255, 255, 255); height: 100%; display: flex; align-items: stretch;"></div></div><div style="width: 50%;"><div style="border: 1px solid rgb(221, 221, 221); min-height: 150px; background-color: rgb(255, 255, 255); height: 100%; display: flex; align-items: stretch;"></div></div></div>`,
    ` <img src="https://www.elgi.com/eu/wp-content/uploads/2024/08/EQ-ELGi-Quest-Series-730x523-1.png" 
                      alt="Placeholder" style="width:100%;" />`,
  ]);

  const htmlContent = pages.join('<div style="page-break-before: always;"></div>');

  const generatePDF = async () => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/generate-pdf/',
        { html: htmlContent },
        { responseType: 'blob' } // Important for downloading files
      );
      console.log(response, 'response');
      // Create a download link for the received PDF
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'generated.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF', error);
    }
  };
  return (
    <AppBar position='static' color='primary'>
      <Container>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Report Generator
          </Typography>
          <Box>
            {/* <PDFDownloadLink document={<MyPDF pages={pages} />} fileName='document.pdf'>
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
            </PDFDownloadLink> */}

            <Button
              sx={{
                backgroundColor: '#fff',
                color: '#1976d2',
                fontSize: 16,
                fontWeight: 600,
                borderRadius: '20px',
                padding: '10px 15px',
                textTransform: 'capitalize',
                ml: 4,
              }}
              onClick={generatePDF}
            >
              export PDf
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
