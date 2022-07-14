import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout';
import { ContributorDetailsPage } from './pages/ContributorDetails';
import { ContributorsPage } from './pages/Contributors';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<ContributorsPage />} />
          <Route path={`/contributors/:login`} element={<ContributorDetailsPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
