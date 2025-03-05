import { Tty } from '@mui/icons-material';
import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill-new';
// import 'react-quill/dist/quill.snow.css';
import Quill from 'quill';
// import BetterTable from 'quill-better-table';

// Quill.register('modules/better-table', BetterTable);

const Editor = ({ section, updateSectionText, pageId, sectionId }) => {
  console.log(section, 'section');
  const { content } = section;
  console.log(content, 'content');
  const [editorValue, setEditorValue] = useState(content || '');

  useEffect(() => {
    setEditorValue(content || '');
  }, [content]);

  const handleChange = (value) => {
    console.log(value, 'Value');
    updateSectionText(pageId, sectionId, value, 'TEXT'); // Update section in parent
    setEditorValue(value); // Update local state
  };

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['image'],
      [{ table: true }], // Add Table Button
    ],
    'better-table': {
      operationMenu: {
        items: { unmergeCells: { text: 'Unmerge Cells' } },
      },
    },
    clipboard: {
      matchVisual: false, // Prevents Quill from modifying table structures
    },
  };
  return (
    <div style={{ maxHeight: '200px', width: '100%' }}>
      <ReactQuill
        value={editorValue}
        onChange={handleChange}
        theme='bubble'
        placeholder='Write something...'
        modules={{ toolbar: true }}
      />
    </div>
  );
};

export default Editor;
