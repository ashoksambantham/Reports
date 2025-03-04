import React from 'react';
import { useDrag } from 'react-dnd';

export const ItemTypes = {
  TEXT: 'TEXT',
  IMAGE: 'IMAGE',
  TABLE: 'TABLE',
};
const CreateDrag = (type, content) => {
  return useDrag(() => ({
    type,
    item: { type, content }, // Pass HTML string content
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
};

const Sidebar = () => {
  // 🟢 Text (With Bold Styling)
  const [{ isDragging: textDragging }, dragText] = CreateDrag(
    ItemTypes.TEXT,
    '<p><strong>Bold Text:</strong> This is a rich text example.</p>'
  );

  // 🟢 Image (Using Placeholder)
  const imageHTML = `<img src="https://www.elgi.com/eu/wp-content/uploads/2024/08/EQ-ELGi-Quest-Series-730x523-1.png" 
                      alt="Placeholder" style="width:100%;" />`;

  const [{ isDragging: imageDragging }, dragImage] = CreateDrag(ItemTypes.IMAGE, imageHTML);

  // 🟢 Table (Basic Preview)
  const tableHTML = `<table border="1" style="width:100%; border-collapse: collapse; border:1px solid red">
      <tr><th>Header 1</th><th>Header 2</th><th>Header 3</th><th>Header 4</th></tr>
      <tr><td>Data 1</td><td>Data 2</td><td>Data 3</td><td>Data 4</td></tr>
    </table>`;

  const [{ isDragging: tableDragging }, dragTable] = CreateDrag(ItemTypes.TABLE, tableHTML);

  return (
    <div className='sidebar' style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {/* 🟢 Text Preview */}
      <div
        ref={dragText}
        className={`toc-item ${textDragging ? 'dragging' : ''}`}
        style={{ cursor: 'grab', padding: '10px', border: '1px solid gray' }}
      >
        <div
          dangerouslySetInnerHTML={{
            __html: '<p><strong>Bold Text:</strong> This is a rich text example.</p>',
          }}
        />
      </div>

      {/* 🟢 Image Preview */}
      <div
        ref={dragImage}
        className={`toc-item ${imageDragging ? 'dragging' : ''}`}
        style={{ cursor: 'grab', border: '1px solid gray', padding: '5px' }}
      >
        <div dangerouslySetInnerHTML={{ __html: imageHTML }} />
      </div>

      {/* 🟢 Table Preview */}
      <div
        ref={dragTable}
        className={`toc-item ${tableDragging ? 'dragging' : ''}`}
        style={{ cursor: 'grab', border: '1px solid gray', padding: '5px' }}
      >
        <div dangerouslySetInnerHTML={{ __html: tableHTML }} />
      </div>
    </div>
  );
};

export default Sidebar;
