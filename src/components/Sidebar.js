import React from 'react';
import { useDrag } from 'react-dnd';

export const ItemTypes = {
  TEXT: 'TEXT',
  IMAGE: 'IMAGE',
  GRAPH: 'GRAPH',
  TABLE: 'TABLE',
};

const Sidebar = () => {
  const [{ isDragging: textIsDragging }, dragText] = useDrag(() => ({
    type: ItemTypes.TEXT,
    item: { type: ItemTypes.TEXT, content: 'This is some text content.' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [{ isDragging: imageIsDragging }, dragImage] = useDrag(() => ({
    type: ItemTypes.IMAGE,
    item: {
      type: ItemTypes.IMAGE,
      content: (
        <img
          src='https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U'
          alt='Placeholder'
        />
      ),
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [{ isDragging: graphIsDragging }, dragGraph] = useDrag(() => ({
    type: ItemTypes.TABLE,
    item: { type: ItemTypes.TABLE, content: 'Graph content will be here' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div className='sidebar'>
      <div ref={dragText} className={`toc-item ${textIsDragging ? 'dragging' : ''}`}>
        This is some text content.
      </div>
      <div ref={dragImage} className={`toc-item ${imageIsDragging ? 'dragging' : ''}`}>
        <img
          src='https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U'
          alt='Placeholder'
        />
      </div>
      <div ref={dragGraph} className={`toc-item ${graphIsDragging ? 'dragging' : ''}`}>
        Graph content will be here
      </div>
    </div>
  );
};

export default Sidebar;
