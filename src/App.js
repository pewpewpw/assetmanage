import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AssetList from './components/AssetList';
import AssetForm from './components/AssetForm';
import AssetDetail from './components/AssetDetail';

function App() {
  return (
    <Router>
      <div>
        <h1>자산관리 시스템</h1>
        <Routes>
          <Route path="/" element={<AssetList />} />
          <Route path="/add" element={<AssetForm />} />
          <Route path="/edit/:id" element={<AssetForm />} />
          <Route path="/asset/:id" element={<AssetDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
