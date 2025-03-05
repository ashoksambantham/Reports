import React, { useEffect, useRef, useState } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './Sidebar';
import Editor from './Editor';
import axios from 'axios';

const styles = {
  scrollableContainer: {
    width: '100%',
    height: '85vh',
    overflowY: 'auto',
    padding: '16px',
    backgroundColor: '#f0f0f0',
  },
  a4Size: {
    width: '210mm',
    height: '297mm',
    backgroundColor: '#fff',
    padding: '64px',
    margin: '16px auto',
    display: 'flex',
    flexDirection: 'column',
  },
  sectionStyle: {
    border: '1px solid #ddd',
    minHeight: '100px',
    backgroundColor: '#fff',
    height: '100%',
    display: 'flex',
    alignItems: 'stretch',
  },
  addPageButton: {
    textAlign: 'center',
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#800080',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

const createEmptySections = () =>
  Array.from({ length: 7 }, (_, i) => ({
    id: i + 1,
    content: null,
    text: '',
  }));

const Container = ({ pages, setPages }) => {
  const containerRef = useRef(null);
  const pageRefs = useRef([]);

  const [htmlPages, setHtmlPages] = useState(null);
  pageRefs.current = pages.map((_, i) => pageRefs.current[i] || React.createRef());

  const addPage = () => {
    setPages((prevPages) => [
      ...prevPages,
      { id: prevPages.length + 1, sections: createEmptySections() },
    ]);
  };

  const updateSectionText = (pageId, sectionId, newText, type) => {
    setPages((prevPages) =>
      prevPages.map((page) =>
        page.id === pageId
          ? {
              ...page,
              sections: page.sections.map((section) =>
                section.id === sectionId
                  ? { ...section, content: newText, text: newText, type: type }
                  : section
              ),
            }
          : page
      )
    );
  };

  useEffect(() => {
    if (containerRef.current) {
      console.log('Full Element:', containerRef.current.innerHTML);
      setHtmlPages(containerRef.current.innerHTML);
      // Extract innerHTML and add it to htmlPages
      //   setHtmlPages((prevPages) => [...prevPages, containerRef.current.innerHTML]);
    }
  }, [pages]);

  const generatePDF = async () => {
    const clonedContainer = containerRef.current.cloneNode(true);
    clonedContainer.querySelectorAll('.ql-tooltip').forEach((toolbar) => toolbar.remove()); // Remove toolbars

    const htmlContent = clonedContainer.innerHTML;
    // const htmlContent = htmlPages;
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
    <div style={styles.scrollableContainer}>
      <div style={{ textAlign: 'center' }}>
        <button style={styles.addPageButton} onClick={generatePDF}>
          export PDf
        </button>
      </div>
      <div>
        {pages.map((page, index) => (
          <div
            key={page.id}
            // ref={pageRefs.current[index]}

            style={styles.a4Size}
            className='pdf-page'
          >
            <div
              ref={containerRef}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                minHeight: '300px',
                height: '100%',
                backgroundColor: 'red',
              }}
            >
              {page.sections.map((section, i) => (
                <div key={section.id} style={{ width: i === 0 ? '100%' : '50%' }}>
                  <DroppableSection
                    section={{ ...section, pageId: page.id }}
                    updateSectionText={updateSectionText}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <button style={styles.addPageButton} onClick={addPage}>
          Add Page
        </button>
      </div>
    </div>
  );
};

const DroppableSection = ({ section, updateSectionText }) => {
  console.log('section', section);
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: [ItemTypes.TEXT, ItemTypes.IMAGE, ItemTypes.TABLE],
    drop: (item) => {
      updateSectionText(section.pageId, section.id, item.content, item.type);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <div
      ref={drop}
      style={{
        ...styles.sectionStyle,
        backgroundColor: isOver && canDrop ? '#f0f0f0' : '#fff',
        minHeight: '150px',
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
            section={section}
            updateSectionText={updateSectionText}
            pageId={section.pageId}
            sectionId={section.id}
          />
        )
      ) : (
        <Editor
          section={''}
          updateSectionText={updateSectionText}
          pageId={section.pageId}
          sectionId={section.id}
        />
      )}
    </div>
  );
};

export default Container;
