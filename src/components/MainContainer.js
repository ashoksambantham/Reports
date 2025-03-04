import React, { useState, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './Sidebar';
import { Grid, Box, Button } from '@mui/material';
import Editor from './Editor';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  Image,
} from '@react-pdf/renderer';

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
  Array.from({ length: 7 }, (_, i) => ({
    id: i + 1,
    content: null,
    text: '',
  }));

const MainContainer = ({ pages, setPages }) => {
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

  const updateSectionText = (pageId, sectionId, newText, type) => {
    console.log(type, 'type');
    setPages((prevPages) =>
      prevPages.map((page) =>
        page.id === pageId
          ? {
              ...page,
              sections: page.sections.map((section) =>
                section.id === sectionId
                  ? {
                      ...section,
                      // content: isDroppedContent ? newText : null,
                      // text: isDroppedContent ? '' : newText,
                      content: newText,
                      text: newText,
                      type: type,
                    }
                  : section
              ),
            }
          : page
      )
    );
  };

  return (
    <Box sx={SCROLLABLE_CONTAINER}>
      <Box>
        {pages.map((page, index) => (
          <Box key={page.id} ref={pageRefs.current[index]} sx={A4_SIZE} className='pdf-page'>
            <Grid container spacing={2} sx={{ height: '100%' }}>
              {page.sections.map((section, i) => (
                <Grid item xs={i === 0 ? 12 : 6} key={section.id}>
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
  if (section.content) {
    console.log(section.type, 'section.content.type ');
  }
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: [ItemTypes.TEXT, ItemTypes.IMAGE, ItemTypes.TABLE],
    drop: (item) => {
      console.log('Item', item);
      updateSectionText(section.pageId, section.id, item.content, item.type);
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
        minHeight: '150px',
        display: 'flex',
        alignItems: 'stretch',
      }}
    >
      {section.content ? (
        section.type === 'IMAGE' || section.type === 'TABLE' ? (
          <div
            dangerouslySetInnerHTML={{ __html: section.content }}
            style={{ width: '100%', height: '100%' }}
          />
        ) : (
          <Editor
            section={section} // Pass dropped text directly
            updateSectionText={updateSectionText}
            pageId={section.pageId}
            sectionId={section.id}
          />
        )
      ) : (
        <Editor
          section={''} // Allow typing if nothing is dropped
          updateSectionText={updateSectionText}
          pageId={section.pageId}
          sectionId={section.id}
        />
      )}
    </Box>
  );
};

export default MainContainer;
