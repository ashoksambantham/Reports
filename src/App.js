import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import MainContainer from './components/MainContainer';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Header from './components/Header';
import { Grid } from '@mui/material';

const createEmptySections = () =>
  Array.from({ length: 7 }, (_, i) => ({
    id: i + 1,
    content: null,
    text: '',
  }));

function App() {
  const [pages, setPages] = useState([{ id: 1, sections: createEmptySections() }]);
  useEffect(() => {
    console.log(pages, 'pages');
  }, [pages]);
  return (
    <>
      <Header pages={pages} />
      <DndProvider backend={HTML5Backend}>
        <Grid container spacing={2} sx={{ mt: 6 }}>
          <Grid item xs={12} md={9}>
            <MainContainer pages={pages} setPages={setPages} />
          </Grid>
          <Grid item xs={12} md={3}>
            <Sidebar />
          </Grid>
        </Grid>
      </DndProvider>
    </>
  );
}

export default App;
