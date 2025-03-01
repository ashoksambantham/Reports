import { Tty } from '@mui/icons-material';
import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill/dist/quill.snow.css';

const Editor = ({ content, updateSectionText, pageId, sectionId }) => {
  const [editorValue, setEditorValue] = useState(content || '');

  // Sync with external content updates (if content changes outside the editor)
  useEffect(() => {
    setEditorValue(content || '');
  }, [content]);

  const handleChange = (value) => {
    setEditorValue(value); // Update local state
    updateSectionText(pageId, sectionId, value, false); // Update section in parent
  };
  // const handleChange = (value, _, source, editor) => {
  //   const plainText = editor.getText(); // Get plain text from Quill
  //   setEditorValue(plainText);

  //   if (updateSectionText) {
  //     updateSectionText(pageId, sectionId, plainText, true);
  //   }
  // };

  // const modules = {
  //   toolbar: [
  //     [{ header: [1, 2, false] }], // Headers: H1, H2, Normal
  //     ['bold', 'italic', 'underline'], // Bold, Italic, Underline
  //     [{ list: 'ordered' }, { list: 'bullet' }], // Ordered & Bullet Lists
  //     ['link', 'image'], // Insert Links & Images
  //     ['clean'], // Remove formatting
  //   ],
  // };

  return (
    <div className='editor-container' style={{ maxHeight: '200px' }}>
      <ReactQuill
        value={editorValue}
        onChange={handleChange}
        theme='bubble'
        placeholder='Write something...'
        modules={{ toolbar: false }}
      />
    </div>
  );
};

export default Editor;
