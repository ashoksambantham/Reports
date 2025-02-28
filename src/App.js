import React, { useState, useRef } from 'react';
import './App.css';
import Editor from './components/Editor';
import Sidebar from './components/Sidebar';
import MainContainer from './components/MainContainer';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Header from './components/Header';
import { Grid, Container } from '@mui/material';
import ExampleMultipage from './Example';
function App() {
  return (
    <>
      {/* <ExampleMultipage /> */}
      <Header />
      <DndProvider backend={HTML5Backend}>
        <Grid container spacing={2} sx={{ mt: 6 }}>
          <Grid item xs={12} md={9}>
            <MainContainer />
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
