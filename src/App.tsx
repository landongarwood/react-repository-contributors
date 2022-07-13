import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout';
import { ContributorsPage } from './pages/Contributors';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<ContributorsPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
