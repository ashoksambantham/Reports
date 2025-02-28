import React, { useState, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './Sidebar';
import { Grid, Box, Button, TextField } from '@mui/material';
import { usePDF } from 'react-to-pdf';
import generatePDF, { Resolution, Margin, Options } from 'react-to-pdf';
import Editor from './Editor';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
// A4 Page Styling
const A4_SIZE = {
  width: '210mm',
  height: '297mm',
  backgroundColor: '#fff',
  // border: '1px solid #ddd',
  padding: '64px',
  margin: '16px auto',
  display: 'flex',
  flexDirection: 'column',
};

// Scrollable Container
const SCROLLABLE_CONTAINER = {
  width: '100%',
  height: '85vh',
  overflowY: 'auto',
  padding: '16px',
  backgroundColor: '#f0f0f0',
};

// Section Style (Ensures Equal Distribution)
const SECTION_STYLE = {
  border: '1px solid #ddd',
  // padding: '16px',
  // textAlign: 'center',
  minHeight: '100px',
  // display: 'flex',
  // alignItems: 'center',
  // justifyContent: 'center',
  backgroundColor: '#fff',
  height: '100%', // Ensures equal height
};

// Generate Empty Sections
const createEmptySections = () =>
  Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    content: null,
    text: '',
  }));

const options: Options = {
  filename: 'advanced-example.pdf',
  method: 'save',
  // default is Resolution.MEDIUM = 3, which should be enough, higher values
  // increases the image quality but also the size of the PDF, so be careful
  // using values higher than 10 when having multiple pages generated, it
  // might cause the page to crash or hang.
  resolution: Resolution.EXTREME,
  page: {
    // margin is in MM, default is Margin.NONE = 0
    margin: Margin.SMALL,
    // default is 'A4'
    format: 'letter',
    // default is 'portrait'
    orientation: 'landscape',
  },
  canvas: {
    // default is 'image/jpeg' for better size performance
    mimeType: 'image/jpeg',
    qualityRatio: 1,
  },
  // Customize any value passed to the jsPDF instance and html2canvas
  // function. You probably will not need this and things can break,
  // so use with caution.
  overrides: {
    // see https://artskydj.github.io/jsPDF/docs/jsPDF.html for more options
    pdf: {
      compress: true,
    },
    // see https://html2canvas.hertzen.com/configuration for more options
    canvas: {
      useCORS: true,
    },
  },
};

const MainContainer = () => {
  const [pages, setPages] = useState([{ id: 1, sections: createEmptySections() }]);
  const pdfRef = useRef();
  const { toPDF, targetRef } = usePDF({ filename: 'report.pdf', ref: pdfRef });

  const pageRefs = useRef([]); // Store refs for each page

  // Initialize refs for each page
  pageRefs.current = pages.map((_, i) => pageRefs.current[i] || React.createRef());
  // Add a new page with blank sections
  const addPage = () => {
    setPages((prevPages) => [
      ...prevPages,
      { id: prevPages.length + 1, sections: createEmptySections() },
    ]);
  };
  const updateSectionText = (pageId, sectionId, newText, isDroppedContent) => {
    setPages((prevPages) =>
      prevPages.map((page) =>
        page.id === pageId
          ? {
              ...page,
              sections: page.sections.map((section) =>
                section.id === sectionId
                  ? {
                      ...section,
                      content: isDroppedContent ? newText : null,
                      text: isDroppedContent ? '' : newText,
                    }
                  : section
              ),
            }
          : page
      )
    );
  };

  const downloadPdf = async () => {
    const pdf = new jsPDF('p', 'mm', 'a4'); // A4 format in portrait mode
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm

    for (let i = 0; i < pages.length; i++) {
      const pageElement = pageRefs.current[i].current;

      if (!pageElement) continue;

      const canvas = await html2canvas(pageElement, {
        scale: 2, // Increase resolution
        useCORS: true, // Allow cross-origin images
        allowTaint: true, // Allow tainted images
      });

      const imgData = canvas.toDataURL('image/png');
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

      if (i > 0) pdf.addPage(); // Add new page for each iteration
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    }

    pdf.save('report.pdf');
  };
  return (
    <Box sx={SCROLLABLE_CONTAINER}>
      {/* Download Button */}
      <Box textAlign='center' mb={2}>
        <Button variant='contained' color='primary' onClick={downloadPdf}>
          Download as PDF
        </Button>
      </Box>

      {/* PDF Container */}
      <Box ref={targetRef}>
        {pages.map((page, index) => (
          <Box key={page.id} ref={pageRefs.current[index]} sx={A4_SIZE} className='pdf-page'>
            <Grid container spacing={2} sx={{ height: '100%' }}>
              {page.sections.map((section) => (
                <Grid item xs={6} key={section.id}>
                  <DroppableSection
                    section={{ ...section, pageId: page.id }}
                    updateSectionText={updateSectionText}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
      </Box>

      {/* Add Page Button */}
      <Box textAlign='center' mt={2}>
        <Button variant='contained' color='secondary' onClick={addPage}>
          Add Page
        </Button>
      </Box>
    </Box>
  );
};

const DroppableSection = ({ section, updateSectionText }) => {
  console.log(section, 'Section');
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: [ItemTypes.TEXT, ItemTypes.IMAGE, ItemTypes.GRAPH],
    drop: (item) => {
      console.log('item', item);
      if (item.type === 'IMAGE') {
        updateSectionText(
          section.pageId, // Pass page ID
          section.id,
          `<img src="${item.content.props.src}" alt="Dropped Image" style="max-width: 100%; height: auto;" />`,
          true
        );
      } else {
        updateSectionText(section.pageId, section.id, item.content, true);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <Box
      ref={drop}
      sx={{
        ...SECTION_STYLE,
        backgroundColor: isOver && canDrop ? '#f0f0f0' : '#fff',
        minHeight: '150px', // Ensure it does not collapse
        display: 'flex',
        alignItems: 'stretch',
        // height: '450px',
      }}
    >
      {section.content ? (
        <div dangerouslySetInnerHTML={{ __html: section.content }} />
      ) : (
        <Editor content={section.content} />
        // <TextField
        //   fullWidth
        //   multiline
        //   value={section.text}
        //   onChange={(e) => updateSectionText(section.id, e.target.value, false)}
        //   placeholder='Type here or drop content'
        //   variant='standard'
        //   InputProps={{
        //     disableUnderline: true,
        //     sx: {
        //       height: '100%',
        //       p: 1,
        //       display: 'flex',
        //       alignItems: 'flex-start', // Ensures text starts from the top-left
        //     },
        //   }}
        //   sx={{
        //     width: '100%',
        //     height: '100%',
        //     display: 'flex',
        //     flexDirection: 'column',
        //     justifyContent: 'flex-start', // Align text to top
        //     alignItems: 'stretch',
        //   }}
        // />
      )}
    </Box>
  );
};

export default MainContainer;
