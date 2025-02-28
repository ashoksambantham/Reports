import React, { useState, useRef } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
} from '@mui/material';
import { PictureAsPdf, Add } from '@mui/icons-material';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';

const ReportGenerator = () => {
  const [selectedMenu, setSelectedMenu] = useState('Templates');
  const [pages, setPages] = useState(['page-1']);
  const contentRefs = useRef({});

  const handleAddPage = () => {
    const newPageId = `page-${pages.length + 1}`;
    setPages([...pages, newPageId]);
  };

  const handleExportPDF = async () => {
    // const pdf = new jsPDF('p', 'mm', 'a4');
    // for (let i = 0; i < pages.length; i++) {
    //   const content = contentRefs.current[pages[i]];
    //   const canvas = await html2canvas(content);
    //   const imgData = canvas.toDataURL('image/png');
    //   if (i > 0) pdf.addPage();
    //   pdf.addImage(imgData, 'PNG', 10, 10, 190, 277);
    // }
    // pdf.save('report.pdf');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Top Navbar */}
      <AppBar position='fixed'>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant='h6'>Report Generator</Typography>
          <Button
            variant='contained'
            color='secondary'
            startIcon={<PictureAsPdf />}
            onClick={handleExportPDF}
          >
            Export as PDF
          </Button>
        </Toolbar>
      </AppBar>

      {/* Left Sidebar */}
      <Drawer
        variant='permanent'
        sx={{ width: 240, flexShrink: 0, [`& .MuiDrawer-paper`]: { width: 240 } }}
      >
        <List>
          {['Templates', 'Text Editor', 'Image'].map((text) => (
            <ListItem
              button
              key={text}
              selected={selectedMenu === text}
              onClick={() => setSelectedMenu(text)}
            >
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content Area */}
      <Box component='main' sx={{ flexGrow: 1, p: 3, mt: 8, ml: 30, width: '100%' }}>
        {pages.map((page) => (
          <Box
            key={page}
            ref={(el) => (contentRefs.current[page] = el)}
            sx={{
              width: '210mm',
              height: '297mm',
              border: '1px solid black',
              background: 'white',
              mb: 2,
            }}
          >
            <Typography variant='h5' align='center' sx={{ p: 2 }}>
              {selectedMenu} Content
            </Typography>
          </Box>
        ))}
        <Button variant='contained' startIcon={<Add />} onClick={handleAddPage}>
          Add Next Page
        </Button>
      </Box>
    </Box>
  );
};

export default ReportGenerator;
