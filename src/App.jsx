import './App.css';
import { RouterProvider } from 'react-router-dom';
import React from 'react';
import PageLayout from './Common/Layout/PageLayout';
import router from './config/router';

function App() {
  return (
    <div className="App">
      <PageLayout router={<RouterProvider router={router} />} />
    </div>
  );
}

export default App;
