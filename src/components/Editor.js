// src/TextEditor.js
import React, { useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill/dist/quill.snow.css'; // import styles for Quill

const Editor = ({ content }) => {
  const [editorValue, setEditorValue] = useState(content);

  const handleChange = (value) => {
    setEditorValue(value);
  };

  return (
    <div className='editor-container' style={{ maxHeight: '200px' }}>
      <ReactQuill
        value={editorValue}
        onChange={handleChange}
        theme='bubble'
        placeholder='Write something...'
        modules={{ toolbar: false }}
      />
      {/* <div>
        <h3>Output:</h3>
        <div
          className="output"
          dangerouslySetInnerHTML={{ __html: editorValue }}
        />
      </div> */}
    </div>
  );
};

export default Editor;
