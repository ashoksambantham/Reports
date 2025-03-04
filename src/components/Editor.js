import { Tty } from '@mui/icons-material';
import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill/dist/quill.snow.css';

const Editor = ({ content, updateSectionText, pageId, sectionId }) => {
  const [editorValue, setEditorValue] = useState(content || '');

  useEffect(() => {
    setEditorValue(content || '');
  }, [content]);

  const handleChange = (value) => {
    setEditorValue(value); // Update local state
    updateSectionText(pageId, sectionId, value, false); // Update section in parent
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
