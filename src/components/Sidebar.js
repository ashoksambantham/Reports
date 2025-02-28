// src/components/Sidebar.js
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

  // const [{ isDragging: tableIsDragging }, dragTable] = useDrag(() => ({
  //   type: ItemTypes.TABLE,
  //   item: {
  //     type: ItemTypes.TABLE,
  //     content: (
  //       <table>
  //         <tr>
  //           <th>Company</th>
  //           <th>Contact</th>
  //           <th>Country</th>
  //         </tr>
  //         <tr>
  //           <td>Alfreds Futterkiste</td>
  //           <td>Maria Anders</td>
  //           <td>Germany</td>
  //         </tr>
  //         <tr>
  //           <td>Centro comercial Moctezuma</td>
  //           <td>Francisco Chang</td>
  //           <td>Mexico</td>
  //         </tr>
  //         <tr>
  //           <td>Ernst Handel</td>
  //           <td>Roland Mendel</td>
  //           <td>Austria</td>
  //         </tr>
  //         <tr>
  //           <td>Island Trading</td>
  //           <td>Helen Bennett</td>
  //           <td>UK</td>
  //         </tr>
  //         <tr>
  //           <td>Laughing Bacchus Winecellars</td>
  //           <td>Yoshi Tannamuri</td>
  //           <td>Canada</td>
  //         </tr>
  //         <tr>
  //           <td>Magazzini Alimentari Riuniti</td>
  //           <td>Giovanni Rovelli</td>
  //           <td>Italy</td>
  //         </tr>
  //       </table>
  //     ),
  //   },
  //   collect: (monitor) => ({
  //     isDragging: monitor.isDragging(),
  //   }),
  // }));

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

      {/* <div ref={dragTable} className={`toc-item ${tableIsDragging ? 'dragging' : ''}`}>
        <table>
          <tr>
            <th>Company</th>
            <th>Contact</th>
            <th>Country</th>
          </tr>
          <tr>
            <td>Alfreds Futterkiste</td>
            <td>Maria Anders</td>
            <td>Germany</td>
          </tr>
          <tr>
            <td>Centro comercial Moctezuma</td>
            <td>Francisco Chang</td>
            <td>Mexico</td>
          </tr>
          <tr>
            <td>Ernst Handel</td>
            <td>Roland Mendel</td>
            <td>Austria</td>
          </tr>
          <tr>
            <td>Island Trading</td>
            <td>Helen Bennett</td>
            <td>UK</td>
          </tr>
          <tr>
            <td>Laughing Bacchus Winecellars</td>
            <td>Yoshi Tannamuri</td>
            <td>Canada</td>
          </tr>
          <tr>
            <td>Magazzini Alimentari Riuniti</td>
            <td>Giovanni Rovelli</td>
            <td>Italy</td>
          </tr>
        </table>
      </div> */}
    </div>
  );
};

export default Sidebar;
