import React, { useState, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './Sidebar';
import { Grid, Box, Button } from '@mui/material';
import Editor from './Editor';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// A4 Page Styling
const A4_SIZE = {
  width: '210mm',
  height: '297mm',
  backgroundColor: '#fff',
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

const SECTION_STYLE = {
  border: '1px solid #ddd',
  minHeight: '100px',
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

const MainContainer = () => {
  const [pages, setPages] = useState([{ id: 1, sections: createEmptySections() }]);
  const pdfRef = useRef();
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
      <Box>
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
      }}
    >
      {section.content ? (
        <div dangerouslySetInnerHTML={{ __html: section.content }} />
      ) : (
        <Editor content={section.content} />
      )}
    </Box>
  );
};

export default MainContainer;
